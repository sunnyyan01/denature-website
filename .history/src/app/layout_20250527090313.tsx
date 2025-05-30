import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail } from "lucide-react";
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { StagewiseToolbar } from '@stagewise/toolbar-next';

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const stagewiseConfig = {
  plugins: []
};

export const metadata: Metadata = {
  title: "DE NATURE - Vegetarian Meals & Plant-Based Catering",
  description: "Delicious, nutritious vegetarian meals and plant-based catering for schools, families, and businesses in Sydney. Fresh, healthy, and sustainable food for everyone.",
  verification: {
    google: "OqLlSQNFE1spUS93SXK13pK8N_CO4S7m2l7H1rPvJmY",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
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
        {process.env.NODE_ENV === 'development' && <StagewiseToolbar config={stagewiseConfig} />}
        {/* 顶部社交信息栏 */}
        <div
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: '#F5F3ED',
            height: '56px',
            borderBottom: '1px solid #E0E0E0',
            fontFamily: "'Inter', 'Lato', sans-serif",
          }}
        >
          <div className="container flex items-center justify-between h-full px-4">
            {/* 联系方式 */}
            <div className="flex items-center space-x-6 text-[#2E5E4E] text-sm">
              <a href="tel:0410811935" className="hover:underline">0410 811 935</a>
              <span className="hidden sm:inline">|</span>
              <a href="mailto:info@denature.org.au" className="hover:underline">info@denature.org.au</a>
            </div>
            {/* 社交图标 */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61575015428081" 
                className="text-[#2E5E4E] hover:text-[#4A7C59]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/denature_healthy_meals/" 
                className="text-[#2E5E4E] hover:text-[#4A7C59]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#2E5E4E] hover:text-[#4A7C59]">
                <FiTwitter className="w-5 h-5" />
              </a>
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
