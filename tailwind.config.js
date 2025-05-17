/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
    extend: {
        colors: {
            neutral: {
                300: 'oklch(0.87 0 0)', // 👈 custom color
            },
        },
    },
};
export const plugins = [];
