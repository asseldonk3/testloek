/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brabant-blue': '#003E7E',
        'construction-orange': '#FF6B35',
        'status-green': '#10B981',
        'status-amber': '#F59E0B',
        'status-red': '#EF4444',
        'status-blue': '#3B82F6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}