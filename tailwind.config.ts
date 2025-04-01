import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B7B42',
        primaryLight: '#34A853',
        primaryDark: '#145F34',
        secondary: '#F4A261',
        background: '#F8FAF9',
        text: '#2E2E2E',
        muted: '#6B7280',
        success: '#22C55E',
        warning: '#FACC15',
        error: '#EF4444'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config; 