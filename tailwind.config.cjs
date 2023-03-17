/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            red: '#FF585F',
            black: '#382425',
            white: '#FFFFFF',
            borders: '#D9D9D9',
            transparent: 'rgba(0,0,0,0)',
        },
        fontFamily: {
            sans: ['sofia-pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
    },
    plugins: [],
};
