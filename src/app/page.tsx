'use client';

import Link from "next/link";
import Image from "next/image";
import { Leaf, Scale, Recycle, Sprout } from "lucide-react";

const coreValues = [
  {
    title: 'Pure Ingredients',
    description: 'Premium natural ingredients, no additives',
    icon: '🌱',
  },
  {
    title: 'Balanced Nutrition',
    description: 'Scientifically balanced meals',
    icon: '🥗',
  },
  {
    title: 'Eco-Conscious',
    description: 'Sustainable practices, Earth-friendly',
    icon: '🌍',
  },
  {
    title: 'Growth Focus',
    description: 'Supporting healthy development',
    icon: '🌱',
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[100vh] w-full">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative container mx-auto px-4 h-screen flex items-start pt-40">
          <div className="max-w-6xl mx-auto w-full pt-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-16 leading-[1.3] font-heading text-center">
              <div className="mb-1 md:mb-3">Bringing Nutritious</div>
              <div>Meals to Every Child</div>
            </h1>
            {/* 四个特点 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-2">Pure Ingredients</h3>
                <p className="text-white">Premium natural ingredients, no additives</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-2">Balanced Nutrition</h3>
                <p className="text-white">Scientifically balanced meals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-2">Eco-Conscious</h3>
                <p className="text-white">Sustainable practices, Earth-friendly</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-2">Growth Focus</h3>
                <p className="text-white">Supporting healthy development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to help all children grow up healthy and strong by ensuring they have access to nutritious, well-balanced meals — especially those from low-income families, refugee backgrounds, or special education environments. We are committed to supporting every child's health, development, and learning through wholesome, nourishing food.
            </p>
          </div>
        </div>
      </section>

      {/* Lunchbox Support Section */}
      <section className="py-24 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">
              Still Wondering What to Pack for Your Child's Lunch Tomorrow?
            </h2>
            <div className="space-y-8 text-gray-700">
              <p className="text-center text-xl">
                Busy mornings. Rising grocery costs. Endless responsibilities.
              </p>
              <p className="text-center text-xl">
                Preparing a healthy lunch for your child shouldn't be a daily struggle.
              </p>
              <p className="text-center text-2xl font-bold text-green-700">
                De Nature Healthy Lunchbox is here to help.
              </p>
              <p className="text-center text-lg">
                We're a nonprofit organization providing fresh, nutritious, and lovingly prepared lunchboxes—because every child deserves a healthy meal at school, and every parent deserves peace of mind.
              </p>
              <p className="text-center text-lg">
                No matter your circumstances, we're here to support you with natural, balanced meals that fuel young minds and growing bodies.
              </p>
              <p className="text-center text-xl font-bold text-green-700">
                It's more than just food.
              </p>
              <p className="text-center text-xl font-bold text-green-700">
                It's care, energy, and dignity—delivered daily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
