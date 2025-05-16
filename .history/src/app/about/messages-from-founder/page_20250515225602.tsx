import React from 'react';

export default function MessagesFromFounder() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <article className="bg-white rounded-2xl shadow-lg p-8 sm:p-12" style={{ background: '#FAFAF7' }}>
            <div className="text-center mb-4">
              <span className="block text-base md:text-lg text-[#7A7A6C] font-medium mb-2 tracking-wide" style={{ letterSpacing: 1 }}>
                A personal message from the founder of De Nature
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 font-heading text-center" style={{ color: '#204B2A', letterSpacing: 1 }}>
              Why I Started Making Healthy Plant-Based Meals
            </h2>
            <div className="space-y-8 text-[17px] leading-8 text-gray-700">
              <p>
                I'm a mother of three, and my children's health has always been my top priority.
              </p>
              <p>
                When my daughter Anna was just one year old, work pressures led me to make a difficult decision—having her temporarily cared for by relatives far away. But when she turned two, she suddenly became seriously ill. She experienced seizures, foamed at the mouth—it was terrifying. We rushed her to the hospital, but no doctor could clearly diagnose or treat her condition.
              </p>
              <blockquote className="border-l-4 pl-6 py-4 my-6 bg-[#f9f9f6] text-lg italic text-[#5A5A4A]" style={{ borderColor: '#E6E6D6' }}>
                “If it happens again, she may suffer permanent brain damage.”
              </blockquote>
              <p>
                As a mother, I couldn't accept that. I started looking for anything I could do—and that path led me to food.
              </p>
              <p>
                I began preparing every meal by hand, eliminating takeout and processed foods, and focusing on clean, fresh, natural ingredients. I knew I couldn't control everything, but I could do my best—so I started with nutrition.
              </p>
              <p>
                Over time, as her diet became more consistent and wholesome, her health showed clear and steady improvement. Although no doctor could explain it, I could feel it: what she ate made a difference.
              </p>
              <p>
                That experience changed me. It showed me that healthy eating isn't just a trend—it's a foundation.
              </p>
              <p>
                Later, I began studying nutrition more deeply and was gradually introduced to the concept of plant-based eating. After hearing a talk by Dr. Eddie Ramirez on the health benefits of a whole-food, plant-based diet, I became even more convinced:
              </p>
              <div className="bg-green-50 rounded-lg p-8 mt-8 text-center">
                <span className="text-xl text-green-900 font-semibold">This is the path I want to follow.</span>
              </div>
              <p>
                Today, I hope to make it easier for more people to access natural, balanced, wholesome, and delicious plant-based meals—whether they are busy professionals, families seeking better food choices, or anyone choosing a plant-based lifestyle.
              </p>
              <p>
                <span className="font-semibold text-green-900">De Nature is more than just a lunchbox.</span><br/>
                It's a way of thinking about food—and a quiet, confident commitment to better living.
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
} 