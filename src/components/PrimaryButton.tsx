import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        bg-[#2D492B]
        text-white
        font-semibold
        text-[16px]
        rounded-[12px]
        px-[20px]
        py-[10px]
        min-h-[44px]
        transition-colors
        duration-200
        hover:bg-[#3D5E3A]
        hover:shadow-md
        focus:outline-none
        font-[Poppins,Inter,sans-serif]
        cursor-pointer
        ${className}
      `}
      style={{ borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontFamily: 'Poppins, Inter, sans-serif', border: 'none', minHeight: 44 }}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton; 