import Image from 'next/image';

export default function AboutPage() {
  return (
    <main style={{ background: '#F8F6F1' }}>
      {/* Hero Section */}
      <section className="relative h-[60vh] py-24">
        <div className="absolute inset-0">
          <Image
            src="/about-hero.jpg"
            alt="About Us Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white space-y-4">
            <h1 className="text-5xl font-bold font-heading" style={{ color: '#204B2A' }}>About Us</h1>
            <p className="text-xl text-gray-200" style={{ color: '#4D4D4D' }}>
              Learn about our story, values, and the impact we're making in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Our Story Section */}
          <section className="mb-16 py-24" style={{ background: '#F2F3EE' }}>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#204B2A' }}>Our Story</h2>
            <div className="bg-[#F0FDF4] p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed" style={{ color: '#4D4D4D' }}>
                Founded in 2020, De Nature emerged from a simple observation: many children in our community were missing out on nutritious meals during their school day. What started as a small initiative to provide healthy lunches has grown into a comprehensive program serving thousands of children across Melbourne.
              </p>
            </div>
          </section>

          {/* Messages from Founder Section */}
          <section className="mb-16 py-24" style={{ background: '#F2F3EE' }}>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#204B2A' }}>Messages from Founder</h2>
            <div className="bg-[#F0FDF4] p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6" style={{ color: '#4D4D4D' }}>
                "Every child deserves the opportunity to thrive, and proper nutrition is essential to that journey. At De Nature, we're not just providing meals; we're investing in the future of our community."
              </p>
              <p className="text-lg text-gray-700 leading-relaxed" style={{ color: '#4D4D4D' }}>
                "Our commitment to quality, sustainability, and community engagement drives everything we do. We're proud to be making a difference in children's lives, one healthy meal at a time."
              </p>
            </div>
          </section>

          {/* Why I Started Section */}
          <section className="mb-16 py-24" style={{ background: '#F2F3EE' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-green-700" style={{ color: '#204B2A' }}>
                Why I Started Making Healthy Lunch Boxes
              </h2>
              <div className="max-w-3xl mx-auto text-gray-600 space-y-6" style={{ color: '#4D4D4D' }}>
                <p>
                  I am a mother of three, and my children's health has always been my top priority.
                </p>
                <p>
                  When my daughter Anna was just one, my busy work schedule forced me to make a heartbreaking decision—I sent her back to China to be cared for by family. But at age two, she suddenly fell gravely ill. She convulsed, foamed at the mouth—it was terrifying. We rushed her to the hospital, but no one could diagnose or treat her condition.
                </p>
                <p>
                  One doctor's words shattered me:
                  <span className="block italic mt-2">"If she has another episode, she may suffer permanent brain damage."</span>
                </p>
                <p>
                  I was devastated, but as a mother, I refused to accept this fate. I took control of her diet, preparing every meal from scratch, researching food therapy, and selecting only natural, nutritious ingredients. For two years, she never ate takeout or food from outside. I observed her progress, adjusted her diet, and held onto hope.
                </p>
                <p>
                  Then, a miracle happened—Anna fully recovered.
                </p>
                <p>
                  Doctors couldn't explain it, but I knew: healthy eating saved her. That moment changed my life.
                </p>
                <p>
                  This is why I created De Nature Healthy Lunch Box—to provide children with nutritious, balanced, and delicious meals that support their health, focus, and growth. I know many parents want the best for their kids but don't always have time to prepare fresh, healthy lunches. De Nature makes it easier.
                </p>
                <p>
                  Because I've been there.
                  <br />
                  Because I understand.
                  <br />
                  This is more than a business—it's my mission.
                </p>
              </div>
            </div>
          </section>

          {/* Vegetarian Meals Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-green-700" style={{ color: '#204B2A' }}>
                Vegetarian Meals – Nutritious, Delicious, and Sustainable Food for All
              </h2>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-700" style={{ color: '#204B2A' }}>Project Overview:</h3>
                <p style={{ color: '#4D4D4D' }}>
                  In Sydney, many people are seeking healthy, plant-based meal options for themselves and their families. Our mission is to provide everyone—children, adults, and organizations—with fresh, delicious vegetarian meals that support well-being and sustainability.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-700" style={{ color: '#204B2A' }}>Our Goal:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li style={{ color: '#4D4D4D' }}>To make nutritious, plant-based meals accessible and enjoyable for all age groups.</li>
                  <li style={{ color: '#4D4D4D' }}>To promote a healthy lifestyle and environmental sustainability through vegetarian food choices.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-700" style={{ color: '#204B2A' }}>Target Groups:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li style={{ color: '#4D4D4D' }}>Families and individuals seeking healthy vegetarian options</li>
                  <li style={{ color: '#4D4D4D' }}>Schools and organizations looking for plant-based catering</li>
                  <li style={{ color: '#4D4D4D' }}>Anyone interested in sustainable, delicious food</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 