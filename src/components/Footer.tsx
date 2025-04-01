'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-green-600 text-white">
      <div className="border-t border-[#FFD700]/30 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-white">
            <p>© 2025 DENATURE HEALTH LIMITED | ALL RIGHTS RESERVED</p>
            <p>ABN: 95685633694</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 