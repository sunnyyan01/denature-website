export default function OurStory() {
  return (
    <main className="min-h-screen pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Story</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/images/about/our-story-1.jpg"
                alt="Our Story Image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/images/about/our-story-2.jpg"
                alt="Our Story Image 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="prose prose-lg mx-auto space-y-6 text-gray-700">
            <p className="text-xl font-medium">
              Our story began with a simple yet unwavering belief:
              <br />
              Nutrition holds the power to heal, transform, and uplift life.
              <br />
              This belief was born from a deeply personal journey of our founder.
            </p>
            
            <p>
              When her young daughter faced ongoing health challenges at the age of two, conventional treatments offered limited improvement. As a mother, she turned to nutrition in search of answers. Through dedicated study and carefully tailored dietary changes, her daughter's health gradually began to improve.
            </p>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8">
              <p className="text-lg italic">
                Though the journey was difficult, it awakened a profound understanding of the connection between food and the body:
                <br />
                Truly natural, wholesome food forms the foundation for healing and growth.
              </p>
            </div>
            
            <p>
              As her research deepened, she discovered that plant-based and gluten-free diets can promote wellness, reduce physical stress, and support overall balance—especially for those with sensitivities, chronic fatigue, or a desire for a gentler lifestyle.
            </p>
            
            <p className="text-xl font-medium text-green-700">
              And so, DE NATURE was born.
            </p>
            
            <p>
              From a humble home kitchen, we grew step by step into a purpose-driven health food brand. We are committed to using only fresh, natural, additive-free ingredients, guided by evidence-based nutritional principles, and preparing every plant-based, gluten-free meal with care and integrity.
            </p>
            
            <div className="bg-green-50 rounded-lg p-8 my-8">
              <p className="text-lg">
                Whether you're a vegetarian, gluten-sensitive, or simply seeking a cleaner and more mindful way to eat,
                <br />
                DE NATURE is here to serve every meal with heart.
              </p>
            </div>
            
            <p className="text-lg">
              This is a true journey, and a continuation of a mother's love. She once believed in the power of nutrition—and today, that same belief is nourishing more lives through DE NATURE.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 