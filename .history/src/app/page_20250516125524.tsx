'use client';

import Link from "next/link";
import Image from "next/image";
import { Leaf, Scale, Recycle, Sprout } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";

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
        </div>
        <div className="relative container mx-auto px-4 h-screen flex items-start pt-32">
          <div className="max-w-6xl mx-auto w-full pt-8 flex flex-col items-center">
            {/* Hero 按钮组整体下移，紧贴黑色文字下方，居中显示 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 mt-[260px] mb-0 w-full sm:w-auto">
              <Link href="/menu" className="w-full sm:w-auto">
                <PrimaryButton
                  className="!bg-[#2D492B] !rounded-[8px] !text-[16px] !font-semibold !px-5 !py-3 min-h-[44px] shadow-none hover:shadow-md hover:!bg-[#3D5E3A] transition-all duration-200 w-full sm:w-auto"
                >
                  Explore Our Menu
                </PrimaryButton>
              </Link>
              <Link
                href="/about/messages-from-founder"
                className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-[#2D492B] text-[#2D492B] bg-transparent font-semibold text-[16px] rounded-[8px] px-5 py-3 min-h-[44px] transition-all duration-200 hover:bg-[#F5F9F5] hover:shadow-md"
                style={{ fontWeight: 600 }}
              >
                Learn Why We Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24" style={{ background: '#F6F6F1' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading" style={{ color: '#1B3F2F' }}>Our Mission</h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#4B6155' }}>
              <p>
                Our mission is to support individuals, families, and communities who choose a plant-based lifestyle—by providing nutritious, well-balanced, and accessible plant-based meals.
              </p>
              <p>
                We believe that everyone deserves access to food that is natural, nourishing, and aligned with their values.<br/>
                Whether you're at home, at school, at work, or part of a broader community, De Nature is committed to making healthy plant-based eating a part of everyday life—wherever you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lunchbox Support Section */}
      <section className="py-24" style={{ background: '#F2F3EE' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#1E5631', fontWeight: 700 }}>
              Still Wondering What to Pack for Your Child's Lunch Tomorrow?
            </h2>
            <div className="space-y-8" style={{ color: '#3F5142' }}>
              <p className="text-center text-xl">
                Busy mornings. Rising grocery costs. Endless responsibilities.
              </p>
              <p className="text-center text-xl">
                Preparing a healthy lunch for your child shouldn't be a daily struggle.
              </p>
              <p className="text-center text-2xl font-bold" style={{ color: '#1E5631' }}>
                De Nature Healthy Lunchbox is here to help.
              </p>
              <p className="text-center text-lg">
                We're a nonprofit organization providing fresh, nutritious, and lovingly prepared lunchboxes—because every child deserves a healthy meal at school, and every parent deserves peace of mind.
              </p>
              <p className="text-center text-lg">
                No matter your circumstances, we're here to support you with natural, balanced meals that fuel young minds and growing bodies.
              </p>
              <p className="text-center text-xl font-bold" style={{ color: '#1E5631' }}>
                It's more than just food.
              </p>
              <p className="text-center text-xl font-bold" style={{ color: '#1E5631' }}>
                It's care, energy, and dignity—delivered daily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
