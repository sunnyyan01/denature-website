import Image from 'next/image';

export default function PartnerWithUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/partner-with-us-hero.jpg"
            alt="Partner With Us"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🤝 Partner With Us</h1>
            <p className="text-xl md:text-2xl text-white mb-8">Join Forces to Create a Better Future for Our Community</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl mb-8">
              At De Nature, we believe in the power of collaboration. By partnering with us, you become part of a movement dedicated to providing healthy meals to children in need while promoting sustainable practices and community engagement.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">🌟 Why Partner With De Nature?</h2>
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
                <span>Join a network of socially responsible organizations</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">💫 Partnership Opportunities</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏫 Schools & Educational Institutions</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Implement healthy lunch programs</span>
                  </li>
                  <li className="flex items-center">
                    <span>Support nutrition education</span>
                  </li>
                  <li className="flex items-center">
                    <span>Create sustainable food practices</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏪 Local Businesses</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Provide food donations</span>
                  </li>
                  <li className="flex items-center">
                    <span>Support community events</span>
                  </li>
                  <li className="flex items-center">
                    <span>Share resources and expertise</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏥 Healthcare Providers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Promote healthy eating habits</span>
                  </li>
                  <li className="flex items-center">
                    <span>Support nutrition education</span>
                  </li>
                  <li className="flex items-center">
                    <span>Provide health expertise</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">🏛️ Community Organizations</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Collaborate on community events</span>
                  </li>
                  <li className="flex items-center">
                    <span>Share resources and networks</span>
                  </li>
                  <li className="flex items-center">
                    <span>Support community outreach</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">🎯 Benefits of Partnership</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span>Access to our community network</span>
              </li>
              <li className="flex items-center">
                <span>Opportunity to participate in community events</span>
              </li>
              <li className="flex items-center">
                <span>Regular impact reports and updates</span>
              </li>
              <li className="flex items-center">
                <span>Networking opportunities with other partners</span>
              </li>
            </ul>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">📬 Get Started</h2>
              <p className="text-lg mb-4">
                Ready to make a difference? Contact us to discuss partnership opportunities that align with your organization's goals.
              </p>
              <p className="text-lg">
                Email: <a href="mailto:info@denature.org.au" className="text-green-600 hover:text-green-700 underline">info@denature.org.au</a>
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