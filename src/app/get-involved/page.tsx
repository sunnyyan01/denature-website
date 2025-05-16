import Image from 'next/image'
import Link from 'next/link'

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] -mt-40 py-24" style={{ background: '#F8F6F1' }}>
        <div className="absolute inset-0">
          <Image
            src="/images/hero/get-involved-hero.jpg"
            alt="Get Involved with DENATURE"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4 pt-40">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ color: '#204B2A' }}>
              Get Involved with DENATURE
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8" style={{ color: '#4D4D4D' }}>
              Make a Difference in Children's Lives
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] -mt-40 py-24" style={{ background: '#F2F3EE' }}>
        <div className="absolute inset-0">
          <Image
            src="/images/community/impact.jpg"
            alt="Get Involved Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4 pt-40">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ color: '#204B2A' }}>
              Get Involved
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8" style={{ color: '#4D4D4D' }}>
              Join us in making a difference. There are many ways to contribute to our mission.
            </p>
            <Link
              href="/get-involved/volunteer"
              className="inline-block bg-[#1B7B42] hover:bg-[#145F34] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300"
            >
              Volunteer Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 