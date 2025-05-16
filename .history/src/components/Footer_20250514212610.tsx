'use client';

import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full" style={{ background: '#f1f5f0', color: '#356A59', fontFamily: "'Inter', 'Lato', sans-serif" }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* 左侧：联系信息 */}
          <div className="flex flex-col items-center md:items-start text-[15px] gap-1">
            <span className="font-semibold">info@denature.org.au</span>
            <span>0452 005 512</span>
            <span>ABN: 95685633694</span>
          </div>
          {/* 中间：版权+口号 */}
          <div className="flex flex-col items-center text-center text-[15px] gap-1">
            <span className="font-semibold">De Nature Health Limited © {currentYear}. All rights reserved.</span>
            <span style={{ fontStyle: 'italic', fontSize: '14px', color: '#68886b' }}>
              It's more than just food. It's care, energy, and dignity—delivered daily.
            </span>
          </div>
          {/* 右侧：社交图标+链接 */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex space-x-4 mb-1">
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
      </div>
    </footer>
  );
} 