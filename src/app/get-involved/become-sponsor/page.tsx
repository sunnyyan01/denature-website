import Image from 'next/image';

export default function BecomeSponsorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/become-sponsor-hero.jpg"
            alt="Become a Sponsor"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Become a Sponsor
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Partner with us to make a lasting impact on children's lives
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl mb-8">
              At De Nature, we believe in the power of partnerships. By becoming a sponsor, you join us in our mission to provide healthy, nutritious meals to children in need while promoting sustainable practices and community engagement.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">🌟 Why Sponsor De Nature?</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span>Make a meaningful impact on children's health and well-being</span>
              </li>
              <li className="flex items-center">
                <span>Support sustainable food practices and reduce waste</span>
              </li>
              <li className="flex items-center">
                <span>Build brand awareness through community engagement</span>
              </li>
              <li className="flex items-center">
                <span>Join a network of socially responsible businesses</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">💫 Sponsorship Opportunities</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🥗 Food Sponsor</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Provide ingredients or prepared meals</span>
                  </li>
                  <li className="flex items-center">
                    <span>Support our healthy lunchbox program</span>
                  </li>
                  <li className="flex items-center">
                    <span>Help ensure food quality and safety</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🚚 Logistics Sponsor</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Provide transportation services</span>
                  </li>
                  <li className="flex items-center">
                    <span>Help with delivery to schools</span>
                  </li>
                  <li className="flex items-center">
                    <span>Support our distribution network</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">💰 Financial Sponsor</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Support program operations</span>
                  </li>
                  <li className="flex items-center">
                    <span>Help expand our reach</span>
                  </li>
                  <li className="flex items-center">
                    <span>Enable program development</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🎓 Education Sponsor</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Support nutrition education</span>
                  </li>
                  <li className="flex items-center">
                    <span>Help with program materials</span>
                  </li>
                  <li className="flex items-center">
                    <span>Enable community workshops</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">🎯 Benefits of Sponsorship</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span>Recognition on our website and social media</span>
              </li>
              <li className="flex items-center">
                <span>Opportunity to participate in community events</span>
              </li>
              <li className="flex items-center">
                <span>Regular impact reports and updates</span>
              </li>
              <li className="flex items-center">
                <span>Networking opportunities with other sponsors</span>
              </li>
            </ul>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">📬 Get Started</h2>
              <p className="text-lg mb-4">
                Ready to make a difference? Contact us to discuss sponsorship opportunities that align with your business goals.
              </p>
              <p className="text-lg">
                Email: <a href="mailto:sponsorship@denature.org.au" className="text-green-600 hover:text-green-700 underline">sponsorship@denature.org.au</a>
              </p>
            </div>

            <p className="text-xl mt-8">
              Together, we can create a healthier, more sustainable future for our children and community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 