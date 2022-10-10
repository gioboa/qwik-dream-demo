const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
