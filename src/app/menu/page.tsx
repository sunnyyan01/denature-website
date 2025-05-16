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

// 为每个菜品添加category字段（初始全部为healthy，您可后续调整）
const weekAMenu = [
  {
    id: 1,
    name: 'Teriyaki Udon with Japanese Lean Beef',
    description: 'Energy: 515 kcal | Protein: 36g | Fiber: 5g',
    details: [
      'Main: Teriyaki udon noodles',
      'Protein: Japanese lean beef',
      'Vegetables: Spinach, carrots, zucchini, sweet corn',
      'Health Rating: 🟢 65% 🟠 30% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/teriyaki-udon.jpg',
    category: 'healthy',
  },
  {
    id: 2,
    name: 'Vietnamese Chicken Roll Plate',
    description: 'Energy: 475 kcal | Protein: 32g | Fiber: 6g',
    details: [
      'Main: Vietnamese rice paper rolls with grilled chicken skewer',
      'Vegetables: Broccoli, bell peppers, roasted pumpkin',
      'Health Rating: 🟢 80% 🟠 15% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/rice-paper-roll.jpg',
    category: 'healthy',
  },
  {
    id: 3,
    name: 'Lemon Butter Fish with Brown Rice',
    description: 'Energy: 455 kcal | Protein: 35g | Fiber: 7g',
    details: [
      'Main: Brown rice',
      'Protein: Lemon butter pan-seared basa fish',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 85% 🟠 10% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/lemon-fish.jpg',
    category: 'healthy',
  },
  {
    id: 4,
    name: 'Pesto Pasta Bowl with Grilled Steak',
    description: 'Energy: 505 kcal | Protein: 40g | Fiber: 6g',
    details: [
      'Main: Pesto pasta',
      'Protein: Grilled steak',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 55% 🟠 35% 🔴 10%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/pesto-pasta.jpg',
    category: 'healthy',
  },
  {
    id: 5,
    name: 'Lentil Patties Power Meal',
    description: 'Energy: 510 kcal | Protein: 30g | Fiber: 8g',
    details: [
      'Main: Lentil patties with brown basmati rice',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 90% 🟠 5% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/lentil-patties.jpg',
    category: 'healthy',
  },
];

const weekBMenu = [
  {
    id: 6,
    name: 'Chinese Veggie Dumpling Combo',
    description: 'Energy: 480 kcal | Protein: 24g | Fiber: 6g',
    details: [
      'Main: Vegetarian dumplings (6 pieces)',
      'Vegetables: Roasted vegetables with creamy orange tahini dressing',
      'Health Rating: 🟢 85% 🟠 10% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/dumplings.jpg',
    category: 'healthy',
  },
  {
    id: 7,
    name: 'Teriyaki Chicken & Millet Meal',
    description: 'Energy: 470 kcal | Protein: 35g | Fiber: 5g',
    details: [
      'Main: Millet & green pea rice',
      'Protein: Teriyaki chicken, Japanese rolled omelet',
      'Vegetables: Cucumber, broccoli, green peas',
      'Health Rating: 🟢 80% 🟠 15% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/teriyaki-chicken.jpg',
    category: 'healthy',
  },
  {
    id: 8,
    name: 'Rainbow Fried Rice with Chicken',
    description: 'Energy: 520 kcal | Protein: 28g | Fiber: 6g',
    details: [
      'Main: Rainbow veggie fried rice',
      'Protein: Grilled chicken thigh (skinless)',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 90% 🟠 5% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/rainbow-rice.jpg',
    category: 'healthy',
  },
  {
    id: 9,
    name: 'Korean Gimbap Bowl with Grilled Chicken',
    description: 'Energy: 525 kcal | Protein: 38g | Fiber: 7g',
    details: [
      'Main: Korean gimbap with brown rice or mixed grains',
      'Protein: Grilled soy-garlic chicken thigh (no frying, no added sugar)',
      'Vegetables: Seasonal vegetables, small portion of kimchi',
      'Health Rating: 🟢 75% 🟠 20% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/korean-gimbap.jpg',
    category: 'healthy',
  },
  {
    id: 10,
    name: 'Mexican Burrito Bowl with Lean Beef & Beans',
    description: 'Energy: 585 kcal | Protein: 42g | Fiber: 7g',
    details: [
      'Main: Whole wheat burrito',
      'Protein: Lean grilled beef strips, black beans',
      'Vegetables: Roasted vegetables',
      'Health Rating: 🟢 70% 🟠 25% 🔴 5%',
      'NSW Health Classification:',
      'Overall Meal Classification: ✅ Everyday'
    ],
    image: '/images/menu/mexican-burrito.jpg',
    category: 'healthy',
  },
];

// 合并所有菜品，便于分类筛选
const allMenus = [
  {
    id: 1,
    name: 'Teriyaki Udon with Grilled Tofu',
    description: 'Energy: 480 kcal | Protein: 25g | Fiber: 6g',
    details: [
      'Main Grain: Udon noodles (light teriyaki glaze)',
      'Protein: Grilled tofu (marinated in reduced sodium teriyaki sauce)',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 85% 🟠 10% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/teriyaki-tofu-udon.jpg',
    category: 'vegetarian',
  },
  {
    id: 2,
    name: 'Pan-Fried Veggie Dumplings with Fresh Salad',
    description: 'Energy: 480 kcal | Protein: 22g | Fiber: 5g',
    details: [
      'Main Grain: Mushroom & Vegetables Three Delicacies Dumplings',
      'Protein: Sweet and Sour tofu',
      'Vegetables: Seasonal Vegetables',
      'Health Rating: 🟢 80% 🟠 15% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/veggie-dumplings.jpg',
    category: 'vegetarian',
  },
  {
    id: 3,
    name: 'Korean Veggie Kimbap',
    description: 'Energy: 470 kcal | Protein: 20g | Fiber: 5g',
    details: [
      'Main Grain: Sushi rice',
      'Protein: Tofu strips',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 85% 🟠 10% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/veggie-kimbap.jpg',
    category: 'vegetarian',
  },
  {
    id: 4,
    name: 'Rainbow Fried Rice with Plant Nuggets',
    description: 'Energy: 495 kcal | Protein: 24g | Fiber: 6g',
    details: [
      'Main Grain: Rice',
      'Protein: Plant-based chicken nuggets',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 75% 🟠 20% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/veggie-fried-rice.jpg',
    category: 'vegetarian',
  },
  {
    id: 5,
    name: 'Inari Tofu Sushi with Garden Salad',
    description: 'Energy: 460 kcal | Protein: 18g | Fiber: 5g',
    details: [
      'Main Grain: Sushi rice (lightly seasoned with rice vinegar)',
      'Protein: Inari tofu skin',
      'Vegetables: Seasonal Vegetables',
      'Health Rating: 🟢 80% 🟠 15% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/inari-sushi.jpg',
    category: 'vegetarian',
  },
  {
    id: 6,
    name: 'Millet Cake with Sweet-Sour Veggie Ribs',
    description: 'Energy: 500 kcal | Protein: 23g | Fiber: 6g',
    details: [
      'Main Grain: Steamed millet cake',
      'Protein: Plant-based sweet-sour ribs (bean-based)',
      'Vegetables: Bell pepper, onion, carrot',
      'Health Rating: 🟢 75% 🟠 20% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/millet-cake.jpg',
    category: 'vegetarian',
  },
  {
    id: 7,
    name: 'Lentil Patties with Brown Rice',
    description: 'Energy: 510 kcal | Protein: 26g | Fiber: 7g',
    details: [
      'Main Grain: Brown rice',
      'Protein: Lentil veggie patties (red lentils, oat, carrot)',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 90% 🟠 10% 🔴 0%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/lentil-patties-veg.jpg',
    category: 'vegetarian',
  },
  {
    id: 8,
    name: 'Fire Veggie Noodles with Plant Chicken',
    description: 'Energy: 490 kcal | Protein: 25g | Fiber: 6g',
    details: [
      'Main Grain: noodles',
      'Protein: Plant chicken slices',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 80% 🟠 15% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/fire-noodles.jpg',
    category: 'vegetarian',
  },
  {
    id: 9,
    name: 'Sushi Rice Balls with Plant Nuggets',
    description: 'Energy: 475 kcal | Protein: 23g | Fiber: 5g',
    details: [
      'Main Grain: Sushi rice',
      'Protein: Plant nuggets',
      'Vegetables: Seasonal vegetables',
      'Health Rating: 🟢 80% 🟠 15% 🔴 5%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/sushi-balls.jpg',
    category: 'vegetarian',
  },
  {
    id: 10,
    name: 'Sweet & Sour Veggie Ribs with Millet Rice',
    description: 'Energy: 460 kcal | Protein: 20g | Fibre: 6g',
    details: [
      'Main Grain: Golden millet & white rice blend',
      'Protein: Soy-based veggie ribs',
      'Vegetables: Seasonal Vegetables',
      'Health Rating: 🟢 90% 🟠 10% 🔴 0%',
      'NSW Category: ✅ Everyday'
    ],
    image: '/images/menu/sweet-sour-ribs.jpg',
    category: 'vegetarian',
  },
  ...weekAMenu,
  ...weekBMenu,
];

export default function MenuPage() {
  // 分类状态
  const [selectedCategory, setSelectedCategory] = useState<Category>('vegetarian');

  // 筛选菜品
  const filteredMenus = allMenus.filter(item => item.category === selectedCategory);

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
          {/* 分类栏：移动端顶部横向滚动，桌面端左侧竖排 */}
          <aside
            className="md:w-72 md:min-w-[220px] flex md:flex-col flex-row items-stretch bg-white border-r md:border-gray-200 shadow-sm pt-2 md:sticky md:top-0 md:z-10 overflow-x-auto md:overflow-visible"
            style={{
              position: 'relative',
              top: undefined,
              zIndex: undefined
            }}
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

          {/* 菜品列表：响应式3/2/1列 */}
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
                    <p className="mb-4" style={{ color: '#4D4D4D', fontSize: 14 }}>{item.description}</p>
                    <div className="space-y-2 mb-4 flex-1">
                      {item.details.map((detail, index) => (
                        detail.includes('Health Rating') ? null : (
                          <p key={index} style={{ color: '#4D4D4D', fontSize: 14 }}>
                            {detail.includes('NSW') ? <span>NSW Category: ✅ Everyday</span> : detail}
                          </p>
                        )
                      ))}
                    </div>
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