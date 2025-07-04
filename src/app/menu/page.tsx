'use client';

import Image from "next/image";
import { useState, useEffect, useContext, useMemo } from 'react';
import { MenuItem } from "./MenuItem";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, PressEvent } from "@heroui/react";
import { AuthContext, DBContext } from "../providers";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { currencyFormat, timeFormat } from "@/utils/format";
import { TimeslotModal } from "./TimeslotModal";
import { ChevronDown, CrossIcon, X } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { getCurTime } from "@/utils/time";
import { HANDLING_TIME } from "@/utils/globals";

export default function MenuPage() {
  const db = useContext(DBContext);
  const auth = useContext(AuthContext);

  const [user] = useAuthState(auth);

  const router = useRouter();

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [category, setCategory] = useState<string>("");
  const [timeslot, setTimeslot] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showTimeslotModal, setShowTimeslotModal] = useState(false);
  const [timeslots, setTimeslots] = useState<Array<Timeslot>>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    let cachedCart = JSON.parse(window.localStorage.getItem("cart") || "{}");
    let cachedTimeslot = parseInt(window.localStorage.getItem("timeslot") || "0");
    if (cachedTimeslot < getCurTime() + HANDLING_TIME) {
      localStorage.removeItem("cart");
      localStorage.removeItem("timeslot");
    } else {
      setTimeslot(cachedTimeslot);
      setCart(cachedCart);
    }

    const fetchCategories = async () => {
      let snapshot = await getDocs(collection(db, "categories"));
      let categories: Record<string, string> = {};
      for (let doc of snapshot.docs) {
        categories[doc.id] = doc.data().name;
      }
      setCategories(categories);
      setCategory(Object.keys(categories)[0]);
    }
    fetchCategories();
  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      let q = query(collection(db, "products"), where("category", "==", category));
      let snapshot = await getDocs(q);
      let newProducts: Record<string, Product> = {};
      for (let doc of snapshot.docs) {
        newProducts[doc.id] = { ...doc.data(), id: doc.id } as Product;
      }
      setProducts(existing => ({ ...existing, ...newProducts }));
    }
    fetchProducts();
  }, [category]);
  useEffect(() => {
    let productId = Object.keys(cart)[0];
    if (productId) {
      window.localStorage.setItem("cart", JSON.stringify(cart));

      if (timeslot == 0) {
        setTimeslots(products[productId]?.timeslots || []);
        setShowTimeslotModal(true);
      } else {
        window.localStorage.setItem("timeslot", timeslot.toString());
      }
    }
  }, [products, timeslot, cart])

  const resetCart = (e?: PressEvent) => {
    setTimeslot(0);
    setCart({});
    localStorage.removeItem("cart");
    localStorage.removeItem("timeslot");
  }
  const removeFromCart = (productId: string) => {
    setCart(prev => {
      delete prev[productId];
      return {...prev};
    })
  }
  const itemsInCart = useMemo(
    () => Object.values(cart).reduce((sum, cur) => sum + cur, 0),
    [cart]
  )
  const cartTotal = useMemo(
    () => Object.entries(cart).reduce((sum, [id, qty]) => (sum + products[id]?.price * qty), 0),
    [products, cart]
  )

  const isAvailableAtTime = (product: Product, time: number) => {
    for (let timeslot of product.timeslots) {
      if (
        time >= timeslot.start && time <= timeslot.end &&
        (time - timeslot.start) % timeslot.interval == 0
      ) {
        return true;
      }
    }
    return false;
  }
  const filteredProducts = useMemo(() => {
    let filtered = Object.values(products);
    if (timeslot != 0)
      filtered = filtered.filter(p => isAvailableAtTime(p, timeslot))
    filtered = filtered.filter(p => p.category == category);
    return filtered;
  }, [products, timeslot, category]);

  const checkout = async () => {
    if (!user) {
      router.push("/login?return-to=menu");
      return;
    }

    setCheckoutLoading(true);

    let userInfo = await getDoc(doc(db, "users", user.uid));
    let order = await addDoc(
      collection(db, "orders"),
      {
        cart,
        cartTotal,
        timeslot,
        user_id: user.uid,
        status: "pending",
      }
    );

    let queryParams = new URLSearchParams({
      customerId: userInfo.data()!["stripe_id"],
      orderId: order.id,
      orderTotal: cartTotal.toString(),
    })
    let resp = await fetch(
      "/api/checkout_session/new?" + queryParams.toString(),
      { method: "POST" },
    );
    let session = await resp.json();
    await updateDoc(
      doc(db, "orders", order.id),
      { "session_id": session.id }
    );

    setCheckoutLoading(false);

    window.location = session.url;
  }

  return (
    <main style={{ background: '#F8F6F1' }} className="flex flex-col">
      <TimeslotModal
        timeslots={timeslots}
        open={showTimeslotModal} setOpen={setShowTimeslotModal}
        setTimeslot={setTimeslot} resetCart={resetCart}
      />

      <section className="relative h-[60vh] -mt-30">
        <div className="inset-0">
          <Image
            src="/images/hero-menu.jpg"
            alt="Menu Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </section>

      <section className="mt-4 mb-2 mx-4 px-4 flex justify-between">
        <div className="px-4 py-2 bg-[#E4BD82] inline-flex justify-center items-center rounded-lg">
          <div className="flex flex-col">
            <b>
              Delivery Time: {" "}
              {timeslot === 0 ? "Not picked yet" : timeFormat(timeslot)}
            </b>
            <p>
              {
                timeslot === 0
                  ? "Feel free to browse for now, we'll let you choose a time when you pick a meal"
                  : "Only showing other meals available for this timeslot."
              }
            </p>
          </div>
          {
            timeslot !== 0 &&
            <Button
              className="p-2 ml-2 rounded-lg"
              radius="sm"
              onPress={resetCart}
            >
              Start Over
            </Button>
          }
        </div>

        <div className="px-4 py-2 flex rounded-lg">
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                disableRipple disableAnimation
                className="px-4"
                variant="bordered"
              >
                Cart ({itemsInCart})
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-1">
                {Object.entries(cart).map(([id, qty]) => (
                  <div key={id} className="flex w-[300px] items-center mb-2">
                    <div>
                      <b>{products[id]?.name || "Unknown Product"}</b>
                      <p>Quantity: {qty}</p>
                    </div>
                    <h4 className="ml-auto mr-1">{currencyFormat(qty * products[id]?.price)}</h4>
                    <Button
                      size="sm" radius="full" isIconOnly variant="light"
                      onPress={() => removeFromCart(id)}
                    >
                      <X color="red" />
                    </Button>
                  </div>
                ))}
                {Object.keys(cart).length == 0 && (
                  <div className="mb-2">
                    <i>No items in cart</i>
                  </div>
                )}
                <div className="flex w-[300px] mb-2">
                  <h4>Total</h4>
                  <h4 className="ml-auto my-auto">{currencyFormat(cartTotal)}</h4>
                </div>
                <Button
                  className="p-2 w-[300px] text-lg bg-[#425A26] text-white text-center rounded-lg"
                  onPress={checkout}
                  isDisabled={Object.keys(cart).length == 0 || checkoutLoading}
                >
                  {
                    checkoutLoading
                    ? "Please wait..."
                    : (user
                      ? "Checkout"
                      : "Please login to checkout")
                  }
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      <section className="px-8 py-2">
        <Dropdown>
          <DropdownTrigger>
            <Button
              disableRipple disableAnimation
              className=""
              variant="bordered"
              endContent={<ChevronDown fill="currentColor" size={16} />}
            >
              Category: {categories[category]}

            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={key => setCategory(key as string)}>
            {Object.entries(categories).map(([id, cat]) => (
              <DropdownItem key={id}>
                {cat}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </section>

      <section className="px-8 py-2">
        <div className="flex-1 md:ml-0 md:mt-0 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
            {filteredProducts.map((item: Product) => (
              <MenuItem
                key={item.id}
                item={item}
                numInCart={cart[item.id] || 0}
                setNumInCart={
                  (num: number) => {
                    setCart(cart => ({ ...cart, [item.id]: num }))
                  }
                }
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-16 text-lg">No meals available in this category</div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
} 