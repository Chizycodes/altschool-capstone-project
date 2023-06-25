/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#543EE0',
				text: '#111111',
				gray: '#626262',
				'light_gray': '#D0D0D0',
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('daisyui')],
	daisyui: {
		themes: [],
	},
};
