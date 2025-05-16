import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
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
            <h1 className="text-5xl font-bold font-heading">About Us</h1>
            <p className="text-xl text-gray-200">
              Learn about our mission, values, and the impact we're making in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Our Story Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="bg-[#F0FDF4] p-8 rounded-lg shadow-sm space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our story began with a simple yet unwavering belief:
                <br />
                <span className="font-semibold">Nutrition holds the power to heal, transform, and uplift life.</span>
                <br />
                This belief was born from a deeply personal journey of our founder.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                When her young daughter faced ongoing health challenges at the age of two, conventional treatments offered limited improvement. As a mother, she turned to nutrition in search of answers. Through dedicated study and carefully tailored dietary changes, her daughter's health gradually began to improve.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Though the journey was difficult, it awakened a profound understanding of the connection between food and the body:
                <br />
                <span className="font-semibold">Truly natural, wholesome food forms the foundation for healing and growth.</span>
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                As her research deepened, she discovered that plant-based and gluten-free diets can promote wellness, reduce physical stress, and support overall balance—especially for those with sensitivities, chronic fatigue, or a desire for a gentler lifestyle.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed font-semibold">
                And so, DE NATURE was born.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                From a humble home kitchen, we grew step by step into a purpose-driven health food brand. We are committed to using only fresh, natural, additive-free ingredients, guided by evidence-based nutritional principles, and preparing every plant-based, gluten-free meal with care and integrity.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a vegetarian, gluten-sensitive, or simply seeking a cleaner and more mindful way to eat,
                <br />
                <span className="font-semibold">DE NATURE is here to serve every meal with heart.</span>
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                This is a true journey, and a continuation of a mother's love. She once believed in the power of nutrition—and today, that same belief is nourishing more lives through DE NATURE.
              </p>
            </div>
          </section>

          {/* Our Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="bg-[#F0FDF4] p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to ensure every child has access to nutritious, delicious meals that support their growth, health, and academic performance. We believe that proper nutrition is a fundamental right, not a privilege, and we're committed to making healthy food accessible to all children in our community.
              </p>
            </div>
          </section>

          {/* Messages from Founder Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Messages from Founder</h2>
            <div className="bg-[#F0FDF4] p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "Every child deserves the opportunity to thrive, and proper nutrition is essential to that journey. At De Nature, we're not just providing meals; we're investing in the future of our community."
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                "Our commitment to quality, sustainability, and community engagement drives everything we do. We're proud to be making a difference in children's lives, one healthy meal at a time."
              </p>
            </div>
          </section>

          {/* Why I Started Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
                Why I Started Making Healthy Lunch Boxes
              </h2>
              <div className="max-w-3xl mx-auto text-gray-600 space-y-6">
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

          {/* Sydney Lunch Program Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
                Sydney Lunch Program – Providing Nutritional and Delicious Meals for Children
              </h2>
              <div className="max-w-3xl mx-auto text-gray-600 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Project Overview:</h3>
                  <p>
                    In Sydney, many children from low-income and refugee families struggle to access balanced and diverse meals due to the high cost of living. We aim to provide these children with healthy, delicious lunches, helping them stay focused on learning and activities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Our Goal:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide low-income, refugee, and special education school children with nutritious, varied, and delicious meals.</li>
                    <li>By offering diverse meals, we aim to improve children's physical health and academic performance.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Target Groups:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Children from low-income families</li>
                    <li>Children from refugee families</li>
                    <li>Special education students</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">How You Can Help:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-semibold">Donate Vegetables and Ingredients:</span> We invite organizations to donate fresh vegetables and food supplies to help us provide nutritious meals for children.</li>
                    <li><span className="font-semibold">Volunteer:</span> Join our team of volunteers and contribute your time and effort to support the program.</li>
                    <li><span className="font-semibold">Spread the Word:</span> Share the project to help us reach more supporters and participants.</li>
                  </ul>
                </div>

                <p className="text-center font-semibold mt-8">
                  Your support can make a lasting impact on these children's future!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 