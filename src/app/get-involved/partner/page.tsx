import Image from 'next/image';

export default function PartnerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] -mt-48">
        <div className="absolute inset-0">
          <Image
            src="/images/community/partner.jpg"
            alt="Partner With Us Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4 pt-40">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Partner With Us
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Join forces with us to create a healthier future for children
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl mb-8">
              At De Nature, we believe in the power of partnerships. By working together with like-minded organizations, we can create a greater impact on children's health and well-being.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">🤝 Partnership Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏫 Schools</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Implement healthy lunch programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Nutrition education initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Community engagement activities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏥 Healthcare Providers</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Nutritional guidance and support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Health education programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Research and development</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏪 Food Industry</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Supply chain partnerships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Product development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Quality assurance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🤲 Community Organizations</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Local outreach programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Volunteer coordination</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Resource sharing</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">💫 Benefits of Partnership</h2>
            <ul className="list-none space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Shared resources and expertise</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Expanded reach and impact</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Innovation and growth opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Community engagement and support</span>
              </li>
            </ul>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">📬 Get Started</h2>
              <p className="text-lg mb-4">
                Ready to join forces with us? Contact us to discuss partnership opportunities that align with your organization's goals.
              </p>
              <p className="text-lg">
                Email: <a href="mailto:partnerships@denature.org.au" className="text-green-600 hover:text-green-700 underline">partnerships@denature.org.au</a>
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