/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'lp-navy': '#021260',
				'lp-light-blue': '#80c3d4',
				'lp-copper': '#e06427',
				'lp-cream-white': '#f7f4f2'
			},
			fontFamily: {
				sans: ['MuseoSans-300'], // 'sans' is set to MuseoSans because Tailwind uses it as the default font
				'lp-title-regular': ['QuicheSans-regular'],
				'lp-title-bold': ['QuicheSans-medium']
			},
			borderRadius: {
				pill: '100vmax'
			}
		}
	},
	plugins: []
};
