import Image from 'next/image';

export default function VolunteerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/volunteer-hero.jpg"
            alt="Volunteer with us"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join the Heart of DENATURE
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Volunteer and Help Us Deliver Healthy Lunches with Love!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl mb-8">
              We warmly invite you to become a part of the DENATURE HEALTH LIMITED volunteer team.
              We are a non-profit organisation dedicated to providing natural, nutritious, and balanced lunchboxes to children from low-income families, refugee communities, and underprivileged backgrounds.
            </p>

            <p className="text-xl mb-8">
              At DENATURE, each meal is more than food — it's care, hope, and dignity delivered in a box.
              Your time and kindness can make a real and lasting difference in a child's life.
            </p>

            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Can You Help?</h2>
              <p className="text-lg mb-8">
                Whether you have a few hours a week or just once a month — we'd love to have you!
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">✓</span>
                  <span>Packing nutritious lunchboxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">✓</span>
                  <span>Helping with sorting and preparing ingredients</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">✓</span>
                  <span>Assisting with delivery to schools or community centres</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">✓</span>
                  <span>Supporting outreach and nutrition education programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1B763E]">✓</span>
                  <span>Sharing a smile and warm words with the children we serve</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">💚 Who Can Volunteer?</h2>
            <p className="text-xl mb-8">
              Whether you're a retiree, a stay-at-home parent, a student, or just someone who cares about health and community — if you have love and time to give, we welcome you with open arms.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">📝 What You Need to Register:</h2>
            <p className="text-xl mb-8">
              All volunteers aged 18 and over will need a Working With Children Check (WWCC) — a free child safety clearance from the NSW Government. You can apply online here:
              <a href="https://www.service.nsw.gov.au/transaction/apply-working-children-check" className="text-green-600 hover:text-green-700 underline ml-1" target="_blank" rel="noopener noreferrer">
                Apply for a WWCC
              </a>
            </p>
            <p className="text-xl mb-8">
              While your WWCC is being processed, you can still register your interest and availability with us. Once cleared, you'll be ready to jump in and start helping!
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">💬 Why It Matters:</h2>
            <blockquote className="text-xl italic mb-8">
              "One meal can nourish a child's body. One smile can light up their world."
            </blockquote>
            <p className="text-xl mb-8">
              At DENATURE, we believe that small acts of kindness can create big change.
              Be part of that change today.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">📩 Ready to join us? Contact:</h2>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-xl font-semibold mb-2">Sophie Wu</p>
              <p className="text-lg mb-2">📞 0410 811 935</p>
              <p className="text-lg">📧 info@denature.org.au</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 