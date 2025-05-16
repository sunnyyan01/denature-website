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

          <div className="space-y-6 text-gray-800 leading-relaxed">
            <p>
              Our story began with a simple yet unwavering belief: every child deserves access to healthy, nutritious meals. This belief was born from a deeply personal experience of our founder.
            </p>
            
            <p>
              When her young daughter faced a severe health crisis at the age of two, traditional medicine offered no effective solution. It was through deep research into nutrition and meticulous dietary adjustments that her daughter's health gradually improved. The journey was heart-wrenching, but it made us realize one powerful truth: scientific nutrition can not only strengthen the body and improve focus—it can also become the key to changing a child's life.
            </p>
            
            <p>
              This awakening led us to recognize that many children are not weak because of illness, but because they lack access to nutritious food. And this "nutrition gap" is far more common in real life than many realize.
            </p>
            
            <p>
              With this insight, DE NATURE was born—with the hope of extending the same care and love from a family kitchen into lunchboxes for more children.
            </p>
            
            <p>
              Today, the number of children we serve continues to grow, but our original purpose remains unchanged: we only use natural, additive-free ingredients, strictly follow balanced nutrition guidelines, and prepare every meal with heart and responsibility.
            </p>
            
            <p>
              This is a true story of hope, determination, and love. A mother believed that nutrition could help her child grow stronger and healthier. Her actions brought about transformation—and that experience now fuels everything we do at DE NATURE.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 