'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import Script from 'next/script';

// 分类常量
type Category = 'vegetarian' | 'glutenfree';
const categories = [
  { key: 'vegetarian', label: 'VEGETARIAN MEALS' },
  { key: 'glutenfree', label: 'GLUTEN FREE MEALS' },
];

// 定义MenuItem类型
interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  mainGrain?: string;
  protein?: string;
  vegetables?: string;
  nswCategory?: string;
  shopifyId?: string;
}

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
    shopifyId: '8837233869012',
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
    shopifyId: '8837234786516',
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
    shopifyId: '8837236228308',
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
    shopifyId: '8837236850900',
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
    shopifyId: '8837237473492',
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
    shopifyId: '8837237735636',
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
    shopifyId: '8837237473492',
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
    shopifyId: '8837253333204',
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
    shopifyId: '8837238358228',
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
    shopifyId: '8837238816980',
  },
];

const glutenFreeMenus: any[] = [];

const allMenus = [
  ...vegetarianMenus,
  ...glutenFreeMenus,
];

const MENU_START_DATE = '2025-06-03'; // WEEK A 周一
const menuMap = {
  "Teriyaki Udon with Grilled Tofu": { week: "A", weekday: 3 },
  "Pan-Fried Veggie Dumplings with Fresh Salad": { week: "A", weekday: 5 },
  "Korean Veggie Kimbap": { week: "B", weekday: 3 },
  "Rainbow Fried Rice with Plant Nuggets": { week: "A", weekday: 4 },
  "Inari Tofu Sushi with Garden Salad": { week: "B", weekday: 2 },
  "Millet Cake with Sweet-Sour Veggie Ribs": { week: "A", weekday: 2 },
  "Lentil Patties with Brown Rice": { week: "B", weekday: 4 },
  "Fire Veggie Noodles with Plant Chicken": { week: "A", weekday: 1 },
  "Sushi Rice Balls with Plant Nuggets": { week: "B", weekday: 5 },
  "Sweet & Sour Veggie Ribs with Millet Rice": { week: "B", weekday: 5 },
};

function getNextDeliveryDate(today: Date, weekType: 'A' | 'B', weekday: number) {
  const start = new Date(MENU_START_DATE);
  let diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  let weekIndex = Math.floor(diff / 7);
  let currentWeekType = weekIndex % 2 === 0 ? 'A' : 'B';
  let daysToAdd = 0;
  const todayWeekday = today.getDay();
  if (currentWeekType === weekType) {
    if (todayWeekday < weekday) {
      daysToAdd = weekday - todayWeekday;
    } else {
      daysToAdd = (7 - todayWeekday) + (weekType === 'A' ? 7 : 14) + (weekday - 1);
    }
  } else {
    daysToAdd = (7 - todayWeekday) + (weekType === 'A' ? 7 : 14) + (weekday - 1);
  }
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);
  return nextDate;
}

function getDeliveryOptions(mealName: string) {
  const today = new Date();
  const map = menuMap[mealName as keyof typeof menuMap];
  if (!map) return [];
  const nextDate = getNextDeliveryDate(today, map.week as 'A' | 'B', map.weekday);
  const y = nextDate.getFullYear();
  const m = String(nextDate.getMonth() + 1).padStart(2, '0');
  const d = String(nextDate.getDate()).padStart(2, '0');
  const dayStr = nextDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  return [
    `${d}/${m}/${y} ${dayStr} 11:00`,
    `${d}/${m}/${y} ${dayStr} 15:00`
  ];
}

declare global {
  interface Window {
    ShopifyBuy: any;
    setReactModalMeal?: (meal: string | null) => void;
    setReactModalComp?: (comp: any | null) => void;
    __showTimeSelectModal?: (mealName: string, comp: any) => void;
  }
}

let shopifyClient: any = null;
let checkoutId: string | null = null;

function initShopifyClient() {
  if (!shopifyClient && typeof window !== 'undefined' && (window as any).ShopifyBuy) {
    shopifyClient = (window as any).ShopifyBuy.buildClient({
      domain: '0i1yby-x7.myshopify.com',
      storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
    });
  }
}

async function getOrCreateCheckout() {
  if (!checkoutId && shopifyClient) {
    const checkout = await shopifyClient.checkout.create();
    checkoutId = checkout.id;
  }
  return checkoutId;
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('vegetarian');
  const [modalMeal, setModalMeal] = useState<MenuItem | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [adding, setAdding] = useState(false);
  const [cartUrl, setCartUrl] = useState('');

  const filteredMenus = selectedCategory === 'vegetarian' ? vegetarianMenus : glutenFreeMenus;

  useEffect(() => {
    // 动态加载 ShopifyBuy SDK
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    script.onload = () => {
      initShopifyClient();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 结算跳转
  const handleCheckout = async () => {
    await getOrCreateCheckout();
    if (checkoutId) {
      window.location.href = `https://0i1yby-x7.myshopify.com/checkout?checkout=${checkoutId}`;
    }
  };

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
              {filteredMenus.map((item) => (
                <div key={item.id} data-meal-name={item.name} className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xl h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-xl"
                      style={{ objectPosition: 'center 70%' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-5">
                    <h3 className="mb-2" style={{ color: '#204B2A', fontWeight: 600, fontSize: 18 }}>{item.name}</h3>
                    <p className="mb-4" style={{ color: '#4D4D4D', fontSize: 14 }}>{item.description}</p>
                    <button
                      className="btn-primary w-full"
                      style={{ marginTop: 8 }}
                      onClick={() => { setModalMeal(item); setSelectedTime(''); }}
                    >
                      Add to cart
                    </button>
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
      {/* 送餐时间选择弹窗 */}
      {modalMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => { setModalMeal(null); setSelectedTime(''); }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="mb-4 text-xl font-semibold">Select Delivery Time</h3>
            <select
              className="w-full border rounded px-3 py-2 mb-4"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
            >
              <option value="">Please select...</option>
              {getDeliveryOptions(modalMeal.name).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              className="btn-primary w-full"
              disabled={!selectedTime || adding}
              onClick={async () => {
                if (!shopifyClient || !modalMeal?.shopifyId) return;
                setAdding(true);
                await getOrCreateCheckout();
                // 获取商品变体ID（假设只有一个变体）
                const product = await shopifyClient.product.fetch(modalMeal.shopifyId);
                const variantId = product.variants[0].id;
                await shopifyClient.checkout.addLineItems(
                  checkoutId,
                  [{
                    variantId,
                    quantity: 1,
                    customAttributes: [{ key: 'Delivery Time', value: selectedTime }]
                  }]
                );
                setAdding(false);
                setModalMeal(null);
                setSelectedTime('');
              }}
            >
              {adding ? 'Adding...' : 'Confirm'}
            </button>
          </div>
        </div>
      )}
      {/* 去结算按钮 */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="btn-primary px-8 py-3 text-lg rounded-xl shadow-lg" onClick={handleCheckout}>
          去结算
        </button>
      </div>
      {/* 动态加载 ShopifyBuy SDK 脚本（防止多次加载） */}
      <Script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js" strategy="afterInteractive" onLoad={initShopifyClient} />
    </main>
  );
} 