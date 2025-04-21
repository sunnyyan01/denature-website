import { Mail } from "lucide-react";

export default function PartnerPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="fixed inset-0 bg-[url('/images/partner-hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-screen flex items-start pt-32">
          <div className="max-w-3xl text-white space-y-4">
            <h1 className="text-5xl font-bold font-heading">Partner With Us</h1>
            <p className="text-xl text-gray-200">
              Join us in making a difference in children's lives through healthy nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Partner Benefits */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Partner With Us</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-700">Make a Real Impact</h3>
                  <p className="text-gray-600">Help provide nutritious meals to children in need.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700">Community Engagement</h3>
                  <p className="text-gray-600">Connect with your local community and make a difference.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700">Sustainable Partnership</h3>
                  <p className="text-gray-600">Build long-term relationships that benefit everyone.</p>
                </div>
              </div>
            </div>
            {/* Partner Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Become a Partner</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Person</label>
                  <input
                    type="text"
                    id="contact"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  ></textarea>
                </div>
                <a href="mailto:info@denature.org.au" className="text-white hover:text-primaryLight transition-colors group relative">
                  <Mail className="w-4 h-4" />
                  <span className="absolute -bottom-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Email Us
                  </span>
                </a>
                <button
                  type="submit"
                  className="w-full bg-[#1B7B42] hover:bg-[#145F34] text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300"
                >
                  Submit Partnership Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 