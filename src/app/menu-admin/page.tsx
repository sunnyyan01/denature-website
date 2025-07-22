'use client';

import Image from "next/image";
import { useState, useEffect, useContext, useMemo } from 'react';
import { MenuItem } from "./MenuItem";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, PressEvent } from "@heroui/react";
import { DBContext } from "../providers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChevronDown, PlusCircleIcon } from "lucide-react";
import { CreateMenuItemModal } from "./CreateMenuItemModal";
import { DeleteMenuItemModal } from "./DeleteMenuItemModal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

export default function MenuAdminPage() {
  const db = useContext(DBContext);

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [category, setCategory] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProductId, setEditProductId] = useState("new");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [showCreateCatModal, setShowCreateCatModal] = useState(false);
  const [showDeleteCatModal, setShowDeleteCatModal] = useState(false);
  const updateMenuItem = (product: Product) => {
    setProducts(prev => ({ ...prev, [product.id]: product }));
  }
  const deleteMenuItem = (productId: number) => {
    setProducts(prev => {
      delete prev[productId];
      return {...prev};
    });
  }
  const createCategory = (id: string, name: string) => {
    setCategories(prev => ({...prev, [id]: name}));
    setCategory(id);
  }
  const deleteCategory = (id: string) => {
    let selCategory: string;
    setCategories(prev => {
      delete prev[id];
      selCategory = Object.keys(prev)[0];
      return {...prev};
    })
    setCategory(selCategory!);
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
    return filtered.filter(p => p.category == category);
  }, [products]);

  return (
    <main style={{ background: '#F8F6F1' }} className="flex flex-col">
      {showCreateModal && <CreateMenuItemModal
        open={showCreateModal} setOpen={setShowCreateModal}
        category={category} productId={editProductId}
        updateMenuItem={updateMenuItem}
      />}
      {showDeleteModal && <DeleteMenuItemModal
        open={showDeleteModal} setOpen={setShowDeleteModal}
        product={products[deleteProductId]}
        deleteMenuItem={deleteMenuItem}
      />}
      <CreateCategoryModal
        open={showCreateCatModal} setOpen={setShowCreateCatModal}
        createCategory={createCategory}
      />
      <DeleteCategoryModal
        open={showDeleteCatModal} setOpen={setShowDeleteCatModal}
        warning={filteredProducts.length > 0}
        categoryId={category} categoryName={categories[category]}
        deleteCategory={deleteCategory}
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

      <section className="px-8 py-2 flex">
        <Dropdown>
          <DropdownTrigger>
            <Button
              disableRipple disableAnimation
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
        <Button
          className="bg-[#425A26] text-white mx-2"
          onPress={() => setShowCreateCatModal(true)}
        >
          New Category
        </Button>
        <Button
          isDisabled={Object.keys(categories).length <= 1}
          className="bg-[#C0C95F]"
          onPress={() => setShowDeleteCatModal(true)}
        >
          Delete Category
        </Button>
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
                openDeleteModal={() => {
                  setDeleteProductId(item.id);
                  setShowDeleteModal(true);
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