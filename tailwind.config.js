/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        '3': '0.75rem',
      },
    },
  },
  plugins: [],
  safelist: [
    'p-3',
    'px-3',
    'py-3',
    'pt-3',
    'pr-3',
    'pb-3',
    'pl-3',
  ],
} 