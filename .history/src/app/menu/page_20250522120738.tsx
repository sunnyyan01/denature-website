'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';

// 分类常量
type Category = 'vegetarian' | 'glutenfree';
const categories = [
  { key: 'vegetarian', label: 'VEGETARIAN MEALS' },
  { key: 'glutenfree', label: 'GLUTEN FREE MEALS' },
];

// 严格与官网一致的菜单数据
const vegetarianMenus = [
  {
    id: 1,
    name: 'Teriyaki Udon with Grilled Tofu',
    image: '/images/menu/teriyaki-tofu-udon.jpg',
    description: 'Energy: 480 kcal | Protein: 25g | Fiber: 6g',
    mainGrain: 'Udon noodles (light teriyaki glaze)',
    protein: 'Grilled tofu (marinated in reduced sodium teriyaki sauce)',
    vegetables: 'Seasonal vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 2,
    name: 'Pan-Fried Veggie Dumplings with Fresh Salad',
    image: '/images/menu/veggie-dumplings.jpg',
    description: 'Energy: 480 kcal | Protein: 22g | Fiber: 5g',
    mainGrain: 'Mushroom & Vegetables Three Delicacies Dumplings',
    protein: 'Sweet and Sour tofu',
    vegetables: 'Seasonal Vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 3,
    name: 'Korean Veggie Kimbap',
    image: '/images/menu/veggie-kimbap.jpg',
    description: 'Energy: 470 kcal | Protein: 20g | Fiber: 5g',
    mainGrain: 'Sushi rice',
    protein: 'Tofu strips',
    vegetables: 'Seasonal vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 4,
    name: 'Rainbow Fried Rice with Plant Nuggets',
    image: '/images/menu/veggie-fried-rice.jpg',
    description: 'Energy: 495 kcal | Protein: 24g | Fiber: 6g',
    mainGrain: 'Rice',
    protein: 'Plant-based chicken nuggets',
    vegetables: 'Seasonal vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 5,
    name: 'Inari Tofu Sushi with Garden Salad',
    image: '/images/menu/inari-sushi.jpg',
    description: 'Energy: 460 kcal | Protein: 18g | Fiber: 5g',
    mainGrain: 'Sushi rice (lightly seasoned with rice vinegar)',
    protein: 'Inari tofu skin',
    vegetables: 'Seasonal Vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 6,
    name: 'Millet Cake with Sweet-Sour Veggie Ribs',
    image: '/images/menu/millet-cake.jpg',
    description: 'Energy: 500 kcal | Protein: 23g | Fiber: 6g',
    mainGrain: 'Steamed millet cake',
    protein: 'Plant-based sweet-sour ribs (bean-based)',
    vegetables: 'Bell pepper, onion, carrot',
    nswCategory: '✅ Everyday',
  },
  {
    id: 7,
    name: 'Lentil Patties with Brown Rice',
    image: '/images/menu/lentil-patties-veg.jpg',
    description: 'Energy: 510 kcal | Protein: 26g | Fiber: 7g',
    mainGrain: 'Brown rice',
    protein: 'Lentil veggie patties (red lentils, oat, carrot)',
    vegetables: 'Seasonal vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 8,
    name: 'Fire Veggie Noodles with Plant Chicken',
    image: '/images/menu/fire-noodles.jpg',
    description: 'Energy: 490 kcal | Protein: 25g | Fiber: 6g',
    mainGrain: 'noodles',
    protein: 'Plant chicken slices',
    vegetables: 'Seasonal vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 9,
    name: 'Sushi Rice Balls with Plant Nuggets',
    image: '/images/menu/sushi-balls.jpg',
    description: 'Energy: 475 kcal | Protein: 23g | Fiber: 5g',
    mainGrain: 'Sushi rice',
    protein: 'Plant nuggets',
    vegetables: 'Seasonal vegetables',
    nswCategory: '✅ Everyday',
  },
  {
    id: 10,
    name: 'Sweet & Sour Veggie Ribs with Millet Rice',
    image: '/images/menu/sweet-sour-ribs.jpg',
    description: 'Energy: 460 kcal | Protein: 20g | Fibre: 6g',
    mainGrain: 'Golden millet & white rice blend',
    protein: 'Soy-based veggie ribs',
    vegetables: 'Seasonal Vegetables',
    nswCategory: '✅ Everyday',
  },
];

const glutenFreeMenus: any[] = [];

const allMenus = [
  ...vegetarianMenus,
  ...glutenFreeMenus,
];

export default function MenuPage() {
  // 分类状态
  const [selectedCategory, setSelectedCategory] = useState<Category>('vegetarian');

  // 筛选菜品
  const filteredMenus = selectedCategory === 'vegetarian' ? vegetarianMenus : glutenFreeMenus;

  return (
    <main style={{ background: '#F8F6F1' }}>
      {/* Hero Section */}
      <section className="relative h-[60vh] -mt-40">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-menu.jpg"
            alt="Menu Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4 pt-56">
          <div className="max-w-4xl">
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
          {/* 分类栏 */}
          <aside
            className="md:w-72 md:min-w-[220px] flex md:flex-col flex-row items-stretch bg-white border-r md:border-gray-200 shadow-sm pt-2 md:sticky md:top-0 md:z-10 overflow-x-auto md:overflow-visible"
            style={{ position: 'relative', top: undefined, zIndex: undefined }}
          >
            <ul className="md:space-y-4 md:px-4 flex flex-row md:flex-col gap-2 md:gap-0 px-2 w-full">
              {categories.map(cat => (
                <li key={cat.key} className="flex-1 min-w-[120px] md:min-w-0">
                  <button
                    className={`w-full h-16 text-center flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-colors duration-200 text-lg md:text-base border
                      ${selectedCategory === cat.key ? 'bg-[#D5ECD4] text-[#204B2A] border-none' : 'bg-white text-gray-500 border-gray-300 hover:bg-[#204B2A] hover:text-white'}
                    `}
                    style={{ fontWeight: 600, fontSize: 18 }}
                    onClick={() => setSelectedCategory(cat.key as Category)}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* 菜品列表 */}
          <div className="flex-1 md:ml-0 md:mt-0 mt-6">
            <h2 className="text-center mb-8" style={{ color: '#204B2A', fontWeight: 700, fontSize: 24 }}>
              {categories.find(c => c.key === selectedCategory)?.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredMenus.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xl flex flex-col"
                  style={{ borderRadius: 12, boxShadow: '0 2px 12px 0 rgba(60,80,60,0.06)' }}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-xl"
                      style={{ objectPosition: 'center 70%' }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="mb-2" style={{ color: '#204B2A', fontWeight: 600, fontSize: 18 }}>{item.name}</h3>
                    <p className="mb-2" style={{ color: '#4D4D4D', fontSize: 14 }}>{item.description}</p>
                    <ul className="mb-2" style={{ color: '#4D4D4D', fontSize: 14, listStyle: 'disc inside' }}>
                      <li><strong>Main Grain:</strong> {item.mainGrain}</li>
                      <li><strong>Protein:</strong> {item.protein}</li>
                      <li><strong>Vegetables:</strong> {item.vegetables}</li>
                      <li><strong>NSW Category:</strong> {item.nswCategory}</li>
                    </ul>
                  </div>
                </div>
              ))}
              {filteredMenus.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-16 text-lg">No meals in this category yet.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 