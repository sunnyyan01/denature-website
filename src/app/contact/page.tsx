'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState(""); // '', 'success', 'error', 'loading'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.target as HTMLFormElement;
    try {
      const res = await fetch("https://formspree.io/f/xblyddbg", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main style={{ background: '#F8F6F1' }}>
      {/* Hero Section */}
      <section className="relative h-[50vh] py-24">
        <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] bg-cover bg-top">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-start pt-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-heading text-center" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
              Contact Us
            </h1>
            <p className="text-xl text-center mb-6" style={{ color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.12)' }}>
              Have questions? We'd love to hear from you.<br/>
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-24" style={{ background: '#F8F6F1' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#204B2A' }}>Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-700" style={{ color: '#204B2A' }}>Address</h3>
                  <p className="text-gray-600" style={{ color: '#4D4D4D' }}>29-31 Burdett St<br />Hornsby NSW 2077</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700" style={{ color: '#204B2A' }}>Phone</h3>
                  <p className="text-gray-600" style={{ color: '#4D4D4D' }}>0410 811 935</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700" style={{ color: '#204B2A' }}>Email</h3>
                  <p className="text-gray-600" style={{ color: '#4D4D4D' }}>info@denature.org.au</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700" style={{ color: '#204B2A' }}>Hours</h3>
                  <p className="text-gray-600" style={{ color: '#4D4D4D' }}>Monday - Friday: 9:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#204B2A' }}>Send us a Message</h2>
              {status === "success" && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                  Your message has been sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
                  Sorry, something went wrong. Please try again later.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700" style={{ color: '#204B2A' }}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700" style={{ color: '#204B2A' }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700" style={{ color: '#204B2A' }}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700" style={{ color: '#204B2A' }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full bg-[#1B7B42] hover:bg-[#145F34] text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 ${
                    status === "loading" ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 