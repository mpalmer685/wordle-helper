// @ts-check

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      flex: {
        '1/2': '0.5 1 0%',
        1.5: '1.5 1 0%',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
