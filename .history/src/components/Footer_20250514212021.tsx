'use client';

import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full" style={{ background: '#F4F4F0', color: '#356A59', fontFamily: "'Inter', 'Lato', sans-serif" }}>
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
        {/* 左侧公司信息 */}
        <div className="text-left md:text-left text-[16px] space-y-2 flex-1">
          <p className="font-semibold text-lg">De Nature Health Limited © {currentYear}. All rights reserved.</p>
          <p>ABN: 95685633694</p>
          <p>
            <a href="mailto:info@denature.org.au" className="hover:underline text-[#356A59]">info@denature.org.au</a> |
            <a href="tel:0452005512" className="hover:underline text-[#356A59] ml-1">0452 005 512</a>
          </p>
        </div>
        {/* 右侧社交图标和快速链接 */}
        <div className="flex flex-col items-start md:items-end gap-4 flex-1">
          <div className="flex space-x-4 mb-2">
            <a href="#" className="group text-[#356A59] transition-transform duration-200 hover:scale-110">
              <FiFacebook className="w-6 h-6 group-hover:bg-[#356A59] group-hover:text-white rounded-full p-1 transition-colors duration-200" />
            </a>
            <a href="#" className="group text-[#356A59] transition-transform duration-200 hover:scale-110">
              <FiInstagram className="w-6 h-6 group-hover:bg-[#356A59] group-hover:text-white rounded-full p-1 transition-colors duration-200" />
            </a>
            <a href="#" className="group text-[#356A59] transition-transform duration-200 hover:scale-110">
              <FiTwitter className="w-6 h-6 group-hover:bg-[#356A59] group-hover:text-white rounded-full p-1 transition-colors duration-200" />
            </a>
          </div>
          <div className="flex space-x-4 text-[15px]">
            <a href="#" className="hover:underline text-[#444]">Privacy Policy</a>
            <a href="#" className="hover:underline text-[#444]">Terms</a>
          </div>
        </div>
      </div>
      {/* 品牌口号 */}
      <div className="text-center mt-6 mb-2">
        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#68886b' }}>
          "It's more than just food. It's care, energy, and dignity—delivered daily."
        </p>
      </div>
    </footer>
  );
} 