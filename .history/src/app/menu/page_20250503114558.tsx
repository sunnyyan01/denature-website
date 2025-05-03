import Link from "next/link";
import Image from "next/image";

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
  },
];

export default function MenuPage() {
  return (
    <main className="min-h-screen">
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Delicious and nutritious meals for growing children
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Healthy Lunchbox Menu</h2>
            <p className="text-lg text-center text-gray-600 max-w-4xl mx-auto mb-10">
              Our carefully crafted meals feature a fusion of international flavors, 
              providing balanced nutrition for your child's growth and development
            </p>
          </div>

          {/* Week A Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Week A: International Cuisine Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weekAMenu.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="space-y-2 mb-4">
                      {item.details.map((detail, index) => (
                        <p key={index} className="text-gray-700 text-sm">• {detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week B Section */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">Week B: Southeast Asian & Mediterranean Week</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weekBMenu.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="space-y-2 mb-4">
                      {item.details.map((detail, index) => (
                        <p key={index} className="text-gray-700 text-sm">• {detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 