import Image from 'next/image';

export default function DonateFundsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/donate-funds-hero.jpg"
            alt="Donate Funds"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Help Us Nourish the Future
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Every healthy lunch is a step toward a brighter childhood.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl mb-8">
              At DE NATURE, we believe:
              <br />
              <span className="font-semibold">Nutrition is a right—not a privilege.</span>
              <br />
              Yet, many children go to school with only snacks or even an empty stomach, affecting their focus, well-being, and development.
            </p>

            <p className="text-xl mb-8">
              Your support can spark change—one meal at a time.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">💛 What Your Donation Can Do:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600 mb-2">$10</p>
                <p className="text-lg">Provides 2 children with a healthy, balanced lunch</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600 mb-2">$50</p>
                <p className="text-lg">Supports nutritious meals for a small classroom (~10 students)</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600 mb-2">$500</p>
                <p className="text-lg">Helps us launch a one-week healthy lunchbox pilot at a school</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">Monthly Giving Makes a Lasting Impact</h2>
            <p className="text-xl mb-8">
              You can choose to support us with a regular monthly donation.
              All funds are managed with transparency and go directly towards food, kitchen operations, and school programs.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mt-12">
              <h2 className="text-2xl font-bold mb-4">📩 Questions?</h2>
              <p className="text-lg mb-4">Email us at: <a href="mailto:info@denature.org.au" className="text-green-600 hover:text-green-700 underline">info@denature.org.au</a></p>
            </div>

            <p className="text-xl mt-8">
              Thank you for supporting DE NATURE.
              Your kindness brings warmth, health, and hope to every child we serve.
              We regularly share updates with our donors to show how your support makes a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 