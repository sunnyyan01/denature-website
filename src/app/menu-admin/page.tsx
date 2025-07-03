'use client';

import Image from "next/image";
import { useState, useEffect, useContext, useMemo } from 'react';
import { MenuItem } from "./MenuItem";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, PressEvent } from "@heroui/react";
import { AuthContext, DBContext } from "../providers";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { currencyFormat, timeFormat } from "@/utils/format";
import { ChevronDown, PlusCircleIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { CreateMenuItemModal } from "./CreateMenuItemModal";

export default function MenuAdminPage() {
  const db = useContext(DBContext);
  const auth = useContext(AuthContext);

  const [user] = useAuthState(auth);

  const router = useRouter();

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [category, setCategory] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProductId, setEditProductId] = useState("new");
  const updateMenuItem = (product: Product) => {
    setProducts(prev => ({ ...prev, [product.id]: product }));
  }

  useEffect(() => {
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

  const filteredProducts = useMemo(() => {
    let filtered = Object.values(products);
    filtered.filter(p => p.category == category);
    return filtered;
  }, [products]);

  return (
    <main style={{ background: '#F8F6F1' }} className="flex flex-col">
      <CreateMenuItemModal
        open={showCreateModal} setOpen={setShowCreateModal}
        category={category} productId={editProductId}
        updateMenuItem={updateMenuItem}
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
          <DropdownMenu onAction={setCategory}>
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
                openEditModal={() => {
                  setEditProductId(item.id);
                  setShowCreateModal(true);
                }}
              />
            ))}
            <Button
              className="bg-white shadow-md w-full max-w-xl h-full flex flex-col text-xl"
              variant="flat"
              onPress={() => {
                setEditProductId("new")
                setShowCreateModal(true);
              }}
            >
              <PlusCircleIcon size={48} />
              <p>Create Menu Item</p>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 