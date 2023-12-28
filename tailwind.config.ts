import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scaleOut: {
          from: {
            transform: 'scale(0, 0)',
            transformOrigin: 'center center',
          },
          to: {
            transform: 'scale(1, 1)',
            transformOrigin: 'center center',
          },
        },
        expandX: {
          from: {
            transform: 'scaleX(0)',
          },
          to: {
            transform: 'scaleX(1)',
          },
        },
        expandY: {
          from: {
            transform: 'scaleY(0)',
          },
          to: {
            transform: 'scaleY(1)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        moveUp: {
          to: {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
