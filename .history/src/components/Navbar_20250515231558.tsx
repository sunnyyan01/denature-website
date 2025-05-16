'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'MENU', href: '/menu' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'GET INVOLVED', href: '/get-involved' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const aboutLinks = [
    { name: 'Our Story', href: '/about/our-story' },
    { name: 'Our Mission', href: '/about/our-mission' },
    { name: 'Messages from Founder', href: '/about/messages-from-founder' },
  ];

  const getInvolvedLinks = [
    { name: 'Volunteer', href: '/get-involved/volunteer' },
    { name: 'Donate Funds', href: '/get-involved/donate-funds' },
    { name: 'Donate Food', href: '/get-involved/donate-food' },
    { name: 'Become a Sponsor', href: '/get-involved/become-sponsor' },
    { name: 'Partner With Us', href: '/get-involved/partner-with-us' },
  ];

  return (
    <>
      {/* Social Info Bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="tel:0452005512" className="hover:text-green-200">
              <i className="fas fa-phone mr-2"></i>0452 005 512
            </a>
            <a href="mailto:info@denature.com" className="hover:text-green-200">
              <i className="fas fa-envelope mr-2"></i>info@denature.com
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-green-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-green-200">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-green-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="absolute w-full z-40 transition-all duration-300 bg-transparent">
        <div className="container mx-auto px-12">
          <div className="flex items-center justify-between h-32">
            <Link href="/" className="flex items-center mt-8">
              <img 
                src="/images/logo/logo-clear.png" 
                alt="DE NATURE Logo" 
                className="h-32 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.name === 'ABOUT US' || item.name === 'GET INVOLVED' ? (
                    <button
                      className={`text-[#DEB887] hover:text-[#D2B48C] transition-colors text-lg font-bold ${
                        pathname === item.href ? 'text-[#D2B48C]' : ''
                      }`}
                      onMouseEnter={() => item.name === 'ABOUT US' ? setIsAboutOpen(true) : setIsGetInvolvedOpen(true)}
                      onMouseLeave={() => item.name === 'ABOUT US' ? setIsAboutOpen(false) : setIsGetInvolvedOpen(false)}
                    >
                      {item.name}
                      <span className="absolute -top-2 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-[#DEB887] hover:text-[#D2B48C] transition-colors text-lg font-bold ${
                        pathname === item.href ? 'text-[#D2B48C]' : ''
                      }`}
                    >
                      {item.name}
                      <span className="absolute -top-2 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Link>
                  )}
                  {item.name === 'ABOUT US' && (
                    <div 
                      className={`absolute top-full left-0 w-48 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg py-2 transition-all duration-200 ${
                        isAboutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setIsAboutOpen(true)}
                      onMouseLeave={() => setIsAboutOpen(false)}
                    >
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`block px-4 py-2 transition-colors rounded-lg
                            ${pathname === link.href ? 'bg-[#F5F9F5] text-[#2D492B] font-semibold' : 'text-gray-700 hover:bg-[#F5F9F5] hover:text-[#2D492B]'}
                          `}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.name === 'GET INVOLVED' && (
                    <div 
                      className={`absolute top-full left-0 w-48 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg py-2 transition-all duration-200 ${
                        isGetInvolvedOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setIsGetInvolvedOpen(true)}
                      onMouseLeave={() => setIsGetInvolvedOpen(false)}
                    >
                      {getInvolvedLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`block px-4 py-2 transition-colors rounded-lg
                            ${pathname === link.href ? 'bg-[#F5F9F5] text-[#2D492B] font-semibold' : 'text-gray-700 hover:bg-[#F5F9F5] hover:text-[#2D492B]'}
                          `}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#DEB887]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="py-4 space-y-4 bg-white/80 backdrop-blur-sm">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.name === 'ABOUT US' ? (
                  <div>
                    <button
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                      className="text-gray-700 hover:text-green-700 transition-colors flex items-center justify-between w-full px-4"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isAboutOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        {aboutLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className={`block px-4 py-2 transition-colors rounded-lg
                              ${pathname === link.href ? 'bg-[#F5F9F5] text-[#2D492B] font-semibold' : 'text-gray-700 hover:bg-[#F5F9F5] hover:text-[#2D492B]'}
                            `}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.name === 'GET INVOLVED' ? (
                  <div>
                    <button
                      onClick={() => setIsGetInvolvedOpen(!isGetInvolvedOpen)}
                      className="text-gray-700 hover:text-green-700 transition-colors flex items-center justify-between w-full px-4"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isGetInvolvedOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isGetInvolvedOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        {getInvolvedLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className={`block px-4 py-2 transition-colors rounded-lg
                              ${pathname === link.href ? 'bg-[#F5F9F5] text-[#2D492B] font-semibold' : 'text-gray-700 hover:bg-[#F5F9F5] hover:text-[#2D492B]'}
                            `}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-green-700 transition-colors px-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
} 