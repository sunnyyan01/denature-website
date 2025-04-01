import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "DE NATURE - Sydney Lunch Program",
  description: "Providing nutritious meals to children in need across Sydney",
  verification: {
    google: "OqLlSQNFE1spUS93SXK13pK8N_CO4S7m2l7H1rPvJmY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background text-text`}>
        {/* Social Info Bar - Fixed at top */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-green-600">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <a href="tel:0452005512" className="text-white hover:text-primaryLight transition-colors group relative">
                  <Phone className="w-4 h-4 inline-block mr-1" />
                  0452 005 512
                  <span className="absolute -bottom-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Call Us
                  </span>
                </a>
                <a href="mailto:info@denature.com" className="text-white hover:text-primaryLight transition-colors group relative">
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  info@denature.com
                  <span className="absolute -bottom-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Email Us
                  </span>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-white hover:text-primaryLight transition-colors group relative">
                  <Facebook className="w-4 h-4" />
                  <span className="absolute -bottom-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Facebook
                  </span>
                </a>
                <a href="#" className="text-white hover:text-primaryLight transition-colors group relative">
                  <Instagram className="w-4 h-4" />
                  <span className="absolute -bottom-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Instagram
                  </span>
                </a>
                <a href="#" className="text-white hover:text-primaryLight transition-colors group relative">
                  <Twitter className="w-4 h-4" />
                  <span className="absolute -bottom-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Twitter
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation and Content */}
        <div className="relative">
          <Navbar />
          <main>
            {children}
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
