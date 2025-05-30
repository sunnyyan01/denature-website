'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
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
    shopifyId: '8837237473492',
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
    shopifyId: '8837253333204',
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
    shopifyId: '8837236228308',
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
    shopifyId: '8837236850900',
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
    shopifyId: '8837234786516',
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
    shopifyId: '8837237735636',
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
    shopifyId: '8837238030548',
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
    shopifyId: '8837233869012',
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
    shopifyId: '8837238358228',
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
    shopifyId: '8837238816980',
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

const MENU_START_DATE = '2025-06-03'; // WEEK A 周一
const menuMap = {
  "Teriyaki Udon with Grilled Tofu": { week: "A", weekday: 3 },
  "Pan-Fried Veggie Dumplings with Fresh Salad": { week: "A", weekday: 5 },
  "Korean Veggie Kimbap": { week: "B", weekday: 3 },
  // ... 其他餐品
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
  }
}

export default function MenuPage() {
  // 分类状态
  const [selectedCategory, setSelectedCategory] = useState<Category>('vegetarian');
  const [modalMeal, setModalMeal] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
              {filteredMenus.map((item, idx) => (
                <div
                  key={item.id}
                  data-meal-name={item.name}
                  className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xl h-full flex flex-col"
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
                  <div className="flex-1 flex flex-col p-5">
                    <h3 className="mb-2" style={{ color: '#204B2A', fontWeight: 600, fontSize: 18 }}>{item.name}</h3>
                    <p className="mb-4" style={{ color: '#4D4D4D', fontSize: 14 }}>{item.description}</p>
                    <div className="mt-auto pb-2">
                      {item.name === 'Teriyaki Udon with Grilled Tofu' && (
                        <>
                          <div id="product-component-1747877597790"></div>
                          <Script id="shopify-buy-button-1747877597790" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837237473492',
                                      node: document.getElementById('product-component-1747877597790'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Pan-Fried Veggie Dumplings with Fresh Salad' && (
                        <>
                          <div id="product-component-1747910690402"></div>
                          <Script id="shopify-buy-button-1747910690402" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837253333204',
                                      node: document.getElementById('product-component-1747910690402'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      }
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Korean Veggie Kimbap' && (
                        <>
                          <div id="product-component-1747880430777"></div>
                          <Script id="shopify-buy-button-1747880430777" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837236228308',
                                      node: document.getElementById('product-component-1747880430777'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Rainbow Fried Rice with Plant Nuggets' && (
                        <>
                          <div id="product-component-1747880471063"></div>
                          <Script id="shopify-buy-button-1747880471063" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837236850900',
                                      node: document.getElementById('product-component-1747880471063'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Inari Tofu Sushi with Garden Salad' && (
                        <>
                          <div id="product-component-1747880525085"></div>
                          <Script id="shopify-buy-button-1747880525085" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837234786516',
                                      node: document.getElementById('product-component-1747880525085'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Millet Cake with Sweet-Sour Veggie Ribs' && (
                        <>
                          <div id="product-component-1747881146466"></div>
                          <Script id="shopify-buy-button-1747881146466" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837237735636',
                                      node: document.getElementById('product-component-1747881146466'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Lentil Patties with Brown Rice' && (
                        <>
                          <div id="product-component-1747881185864"></div>
                          <Script id="shopify-buy-button-1747881185864" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837238030548',
                                      node: document.getElementById('product-component-1747881185864'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Fire Veggie Noodles with Plant Chicken' && (
                        <>
                          <div id="product-component-1747881377645"></div>
                          <Script id="shopify-buy-button-1747881377645" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837233869012',
                                      node: document.getElementById('product-component-1747881377645'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Sushi Rice Balls with Plant Nuggets' && (
                        <>
                          <div id="product-component-1747881405825"></div>
                          <Script id="shopify-buy-button-1747881405825" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837238358228',
                                      node: document.getElementById('product-component-1747881405825'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                      {item.name === 'Sweet & Sour Veggie Ribs with Millet Rice' && (
                        <>
                          <div id="product-component-1747881440596"></div>
                          <Script id="shopify-buy-button-1747881440596" strategy="afterInteractive">
                            {`
                              (function () {
                                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                                if (window.ShopifyBuy) {
                                  if (window.ShopifyBuy.UI) {
                                    ShopifyBuyInit();
                                  } else {
                                    loadScript();
                                  }
                                } else {
                                  loadScript();
                                }
                                function loadScript() {
                                  var script = document.createElement('script');
                                  script.async = true;
                                  script.src = scriptURL;
                                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                                  script.onload = ShopifyBuyInit;
                                }
                                function ShopifyBuyInit() {
                                  var client = ShopifyBuy.buildClient({
                                    domain: '0i1yby-x7.myshopify.com',
                                    storefrontAccessToken: '9b9636ef74206a73e0cf6fee990a86ba',
                                  });
                                  ShopifyBuy.UI.onReady(client).then(function (ui) {
                                    ui.createComponent('product', {
                                      id: '8837238816980',
                                      node: document.getElementById('product-component-1747881440596'),
                                      moneyFormat: '%24%7B%7Bamount%7D%7D',
                                      options: {
                                        "product": {
                                          "contents": {
                                            "title": false,
                                            "button": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          },
                                          "events": {
                                            "addVariantToCart": function(product) {
                                              // 这里会被后续JS触发
                                            }
                                          }
                                        },
                                        "productSet": {
                                          "styles": {
                                            "products": {
                                              "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                              }
                                            }
                                          }
                                        },
                                        "modalProduct": {
                                          "contents": {
                                            "img": false,
                                            "imgWithCarousel": true,
                                            "button": true,
                                            "buttonWithQuantity": true
                                          },
                                          "styles": {
                                            "product": {
                                              "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                              }
                                            }
                                          },
                                          "text": {
                                            "button": "Add to cart"
                                          }
                                        },
                                        "option": {},
                                        "cart": {
                                          "text": {
                                            "total": "Subtotal",
                                            "button": "Checkout"
                                          }
                                        },
                                        "toggle": {}
                                      },
                                    });
                                  });
                                }
                              })();
                            `}
                          </Script>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setModalMeal(item.name)}
                      className="btn-primary"
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
      {/* Modal 对话框 */}
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
              {getDeliveryOptions(modalMeal).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              className="btn-primary w-full"
              disabled={!selectedTime}
              onClick={() => {
                const comp = window.ShopifyBuy && window.ShopifyBuy.UI && window.ShopifyBuy.UI.components && window.ShopifyBuy.UI.components.product && Array.isArray(window.ShopifyBuy.UI.components.product)
                  ? window.ShopifyBuy.UI.components.product.find((c: any) => c.model && c.model.title === modalMeal)
                  : null;
                if (comp && selectedTime) {
                  comp.props.options.product.events.addVariantToCart = function(product: any) {
                    product.model.selectedOptions.push({
                      name: 'Delivery Time',
                      value: selectedTime
                    });
                  };
                  comp.addVariantToCart();
                }
                setModalMeal(null);
                setSelectedTime('');
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </main>
  );
} 