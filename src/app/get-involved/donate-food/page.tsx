import Image from 'next/image';

export default function DonateFoodPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/donate-food-hero.jpg"
            alt="Donate Food"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Donate Food
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Share the gift of healthy food with children in need
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl mb-8">
              At De Nature, we believe good food should never go to waste—especially when there are still children going to school hungry.
            </p>
            <p className="text-xl mb-8">
              We welcome food donations to support our healthy lunchbox initiative, but food safety is always our top priority. We follow all NSW Food Authority and Federal Health guidelines to ensure every donated item is safe, nutritious, and respectful of those we serve.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">✅ REGISTERED FOOD BUSINESSES</h2>
            <p className="text-xl mb-6">
              If you're a licensed café, restaurant, grocer, caterer, or food supplier, we would love to partner with you!
            </p>

            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">We accept:</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">•</span>
                  <span>Surplus fresh produce</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">•</span>
                  <span>Breads, dairy, pantry goods, and cooked food (if properly stored and transported)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">•</span>
                  <span>Items that are sealed, labeled, and within date</span>
                </li>
              </ul>
            </div>

            <p className="text-xl mb-8">
              All donations must meet legal food safety standards. We're happy to arrange one-off or regular pick-up/drop-off options depending on your location.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">🚫 PRIVATE HOUSEHOLDS – Perishable Items</h2>
            <p className="text-xl mb-8">
              Due to food safety laws, we cannot accept perishable foods from households unless you are a trained volunteer with De Nature.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">But you CAN still make a difference:</h3>
            <h4 className="text-lg font-semibold mt-6 mb-4">🥫 Non-Perishable Food Donations – Yes, Please!</h4>
            <p className="text-xl mb-6">We gladly accept non-perishable pantry items like:</p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>Canned vegetables, fruits, beans, soups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>Tinned fish, baked beans, pasta sauces</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>UHT milk, tea, coffee, rice, noodles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>Long shelf-life snacks and breakfast items</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Please ensure:</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>Items are sealed and in original packaging</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>They are within use-by or no more than 3 months past best-before date</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B763E]">•</span>
                <span>No mould, leakage, or unlabelled products</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">❌ We Cannot Accept:</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-red-600">•</span>
                <span>Food past its Use By date</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">•</span>
                <span>Leaking or unsealed items</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">•</span>
                <span>Unlabelled or visibly damaged food</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">•</span>
                <span>Perishables from private households (unless trained & approved)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">•</span>
                <span>Anything unfit for consumption</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">📦 Drop-off / Collection</h2>
            <p className="text-xl mb-8">
              We are working on creating drop-off locations across Sydney. In the meantime, please contact us to organise donation logistics.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">📬 Contact Us</h2>
              <p className="text-lg">Email: <a href="mailto:info@denature.org.au" className="text-green-600 hover:text-green-700 underline">info@denature.org.au</a></p>
            </div>

            <p className="text-xl mt-8">
              🙏 Every donated item counts. Thank you for helping us nourish children, reduce waste, and spread care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 