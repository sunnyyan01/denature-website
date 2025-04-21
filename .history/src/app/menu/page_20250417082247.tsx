import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    id: 1,
    name: 'Japanese Wagyu Beef Meal',
    description: 'Protein: 36g | Dietary Fiber: 5g | 515 kcal',
    details: [
      'Main: Millet Rice (150g)',
      'Protein: Japanese Wagyu Slices (80g), Egg (50g)',
      'Vegetables: Cucumber, Carrot, Broccoli, Cherry Tomatoes (120g)',
      'Flavor Highlight: Healthy and delicious Japanese Wagyu beef paired with fresh vegetables'
    ],
    image: '/images/menu/wagyu-beef.jpg',
  },
  {
    id: 2,
    name: 'Vietnamese Rice Paper Roll Set',
    description: 'Protein: 32g | Dietary Fiber: 6g | 475 kcal',
    details: [
      'Main: Vietnamese Rice Paper Rolls (Grilled Chicken Skewer, Broccoli, Tri-colored Bell Peppers, Roasted Pumpkin) (150g)',
      'Protein: Grilled Chicken Skewer (80g)',
      'Vegetables: Cucumber, Broccoli, Bell Peppers, Carrot (120g)',
      'Flavor Highlight: Fresh Vietnamese flavor paired with sweet and sour dipping sauce'
    ],
    image: '/images/menu/rice-paper-roll.jpg',
  },
  {
    id: 3,
    name: 'Lemon Butter Fish Bowl',
    description: 'Protein: 35g | Dietary Fiber: 7g | 455 kcal',
    details: [
      'Main: Brown Rice (150g)',
      'Protein: Pan-fried Lemon Basa Fish (90g)',
      'Vegetables: Roasted Sweet Potato, Pumpkin, Corn, Egg, Roasted Bell Pepper, Cherry Tomatoes, Broccoli, Green Peas (130g)',
      'Flavor Highlight: Fresh lemon aroma paired with Basa fish, low-fat and healthy'
    ],
    image: '/images/menu/lemon-fish.jpg',
  },
  {
    id: 4,
    name: 'Pesto Pasta with Grilled Steak',
    description: 'Protein: 40g | Dietary Fiber: 6g | 505 kcal',
    details: [
      'Main: Pesto Pasta (150g)',
      'Protein: Steak (90g)',
      'Vegetables: Broccoli, Carrot, Tomato (120g)',
      'Flavor Highlight: Perfect combination of fragrant pesto sauce and steak'
    ],
    image: '/images/menu/pesto-pasta.jpg',
  },
  {
    id: 5,
    name: 'Tonkatsu Udon Noodle Bowl',
    description: 'Protein: 38g | Dietary Fiber: 5g | 545 kcal',
    details: [
      'Main: Teriyaki Sauce Udon Noodles (180g)',
      'Protein: Pork Cutlet (90g)',
      'Vegetables: Broccoli, Cucumber, Carrot (120g)',
      'Flavor Highlight: Japanese udon noodles paired with pork cutlet, warming and nourishing'
    ],
    image: '/images/menu/tonkatsu-udon.jpg',
  },
  {
    id: 6,
    name: 'Chinese Braised Beef Rice Ball Set',
    description: 'Protein: 39g | Dietary Fiber: 6g | 485 kcal',
    details: [
      'Main: Pork Floss and Luncheon Meat Rice Ball (150g)',
      'Protein: Chinese Braised Beef (80g), Soft-boiled Egg (50g)',
      'Vegetables: Broccoli, Cherry Tomatoes, Seasonal Vegetables (120g)',
      'Flavor Highlight: Classic Chinese braised flavor, paired with rice balls for easy eating'
    ],
    image: '/images/menu/braised-beef.jpg',
  },
  {
    id: 7,
    name: 'Teriyaki Chicken & Tofu Rice Wrap Set',
    description: 'Protein: 35g | Dietary Fiber: 5g | 470 kcal',
    details: [
      'Main: Tofu Skin Wrapped Rice (150g)',
      'Protein: Teriyaki Chicken (80g), Thick Egg Roll (50g)',
      'Vegetables: Cucumber, Green Peas, Broccoli (120g)',
      'Flavor Highlight: Classic Japanese teriyaki flavor, rich in protein, fresh and delicious'
    ],
    image: '/images/menu/teriyaki-chicken.jpg',
  },
  {
    id: 8,
    name: 'Tomato Meat Sauce Pasta Bowl',
    description: 'Protein: 40g | Dietary Fiber: 6g | 505 kcal',
    details: [
      'Main: Pasta (150g)',
      'Protein: Tomato Meat Sauce (90g)',
      'Vegetables: Broccoli, Cherry Tomatoes, Carrot (120g)',
      'Flavor Highlight: Classic Italian meat sauce paired with herbs and pasta'
    ],
    image: '/images/menu/tomato-pasta.jpg',
  },
  {
    id: 9,
    name: 'Korean Honey Chicken Gimbap Bowl',
    description: 'Protein: 38g | Dietary Fiber: 6g | 530 kcal',
    details: [
      'Main: Korean Seaweed Rice Roll (150g)',
      'Protein: Korean Honey Fried Chicken (80g)',
      'Vegetables: Kimchi, Purple Cabbage, Carrot, Cucumber (120g)',
      'Flavor Highlight: Spicy Korean flavor, paired with kimchi and rice, rich taste'
    ],
    image: '/images/menu/korean-bbq.jpg',
  },
  {
    id: 10,
    name: 'Mexican Wagyu Burrito Meal',
    description: 'Protein: 40g | Dietary Fiber: 7g | 590 kcal',
    details: [
      'Main: Whole Wheat Tortilla (150g)',
      'Protein: Mexican Spiced Roasted Wagyu Strips (90g), Egg (50g)',
      'Vegetables: Roasted Cauliflower, Bell Peppers, Corn Kernels, Avocado Sauce (120g)',
      'Flavor Highlight: Rich Mexican flavor, a new taste experience for children'
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
              Our carefully crafted meals feature a fusion of Asian, Western, and Mediterranean flavors, 
              providing balanced nutrition for your child's growth and development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
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
      </section>
    </main>
  );
} 