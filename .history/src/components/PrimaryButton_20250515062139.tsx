import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        bg-[#1F442E]
        text-white
        font-medium
        text-[16px]
        rounded-lg
        px-6
        py-3
        transition-colors
        duration-200
        hover:bg-[#153D26]
        focus:outline-none
        font-[Poppins,Inter,sans-serif]
        cursor-pointer
        shadow-sm
        ${className}
      `}
      style={{ borderRadius: 8, padding: '12px 24px', fontWeight: 500, fontFamily: 'Poppins, Inter, sans-serif' }}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton; 