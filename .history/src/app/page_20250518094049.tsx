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
      <section className="relative w-full aspect-[4/3] sm:aspect-[16/6]">
        <Image
          src="/images/hero-bg.jpg"
          alt="Menu Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="relative container mx-auto px-4 h-full flex items-start pt-32">
          <div className="max-w-6xl mx-auto w-full pt-8 flex flex-col items-center">
            {/* Hero 按钮组整体下移，紧贴黑色文字下方，居中显示 */}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20" style={{ background: '#F6F6F1' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-heading" style={{ color: '#1B3F2F' }}>Our Mission</h2>
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#4B6155' }}>
            <p>
              Our mission is to support local communities — especially schools, churches, and grassroots organisations — by providing nutritious, well-balanced vegetarian meals.
            </p>
            <p>
              We believe that every child and every family deserves access to healthy food, and we are committed to making wholesome, affordable meals part of daily life in local groups and educational settings.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading" style={{ color: '#1B3F2F' }}>Who We Serve</h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#4B6155' }}>
              <p>
                At De Nature, we believe nutritious, plant-based meals should be accessible to everyone—no matter their age, background, or lifestyle.
              </p>
              <p className="text-left md:text-center">
                We proudly serve:
              </p>
              <ul className="space-y-3 text-left md:text-center">
                <li>🏫 Schools and childcare centres seeking healthy meals that children actually enjoy.</li>
                <li>🏘️ Local families who want a simpler way to provide wholesome food—without the stress of daily lunch prep.</li>
                <li>🧑‍💼 Busy professionals who care about nutrition but don't always have time to cook.</li>
                <li>💚 People choosing a plant-based lifestyle for health, ethical, or environmental reasons.</li>
                <li>🫶 Community groups and support programs working to provide better food options for all.</li>
              </ul>
              <p>
                Whether you're feeding your child, your team, or yourself—De Nature makes plant-based eating simple, satisfying, and sustainable.
              </p>
              <p className="font-semibold italic" style={{ color: '#1B3F2F' }}>
                Because food should nourish more than just the body—it should nourish lives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
