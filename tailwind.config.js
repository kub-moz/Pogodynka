/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: .55 },
          '50%': { opacity: .4 },
        },
      },
      animation: {
        pulse: 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

    },
  },
  plugins: [],
}