// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,jsx,ts,tsx,css,scss}'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                // Blue shades
                'blue-50': '#e6f1fe',
                'blue-100': '#b0d3fb',
                'blue-200': '#8abdf9',
                'blue-300': '#549ff7',
                'blue-400': '#338df5',
                'blue-500': '#0070f3',
                'blue-600': '#0066dd',
                'blue-700': '#0050ad',
                'blue-800': '#003e86',
                'blue-900': '#002f66',

                // Purple shades
                'purple-50': '#f8e6ff',
                'purple-100': '#ebb0ff',
                'purple-200': '#e18aff',
                'purple-300': '#d354ff',
                'purple-400': '#ca33ff',
                'purple-500': '#bd00ff',
                'purple-600': '#ac00e8',
                'purple-700': '#8600b5',
                'purple-800': '#68008c',
                'purple-900': '#4f006b',

                // Teal shades
                'teal-50': '#e6fffc',
                'teal-100': '#b0fff5',
                'teal-200': '#8afff1',
                'teal-300': '#54ffea',
                'teal-400': '#33ffe6',
                'teal-500': '#00ffe0',
                'teal-600': '#00e8cc',
                'teal-700': '#00b59f',
                'teal-800': '#008c7b',
                'teal-900': '#006b5e',

                // Neutral shades
                'neutral-5': '#F6F6F6',
                'neutral-50': '#ebecec',
                'neutral-100': '#c2c3c4',
                'neutral-200': '#a4a6a8',
                'neutral-300': '#7a7d80',
                'neutral-400': '#616467',
                'neutral-500': '#393d41',
                'neutral-600': '#34383b',
                'neutral-700': '#282b2e',
                'neutral-800': '#1f2224',
                'neutral-900': '#181a1b',

                // Green shades
                'green-50': '#e6f9e6',
                'green-100': '#b0ecb2',
                'green-200': '#8ae38c',
                'green-300': '#54d658',
                'green-400': '#33ce38',
                'green-500': '#00c206',
                'green-600': '#00b105',
                'green-700': '#008a04',
                'green-800': '#006b03',
                'green-900': '#005103',

                // Red shades
                'red-50': '#fde6e6',
                'red-100': '#f9b0b0',
                'red-200': '#f78a8a',
                'red-300': '#f35454',
                'red-400': '#f13333',
                'red-500': '#ed0000',
                'red-600': '#d80000',
                'red-700': '#a80000',
                'red-800': '#820000',
                'red-900': '#640000',

                // Orange shades
                'orange-50': '#fff6e6',
                'orange-100': '#ffe4b0',
                'orange-200': '#ffd78a',
                'orange-300': '#ffc554',
                'orange-400': '#ffb933',
                'orange-500': '#ffa800',
                'orange-600': '#e89900',
                'orange-700': '#b57700',
                'orange-800': '#8c5c00',
                'orange-900': '#6b4700'
            },
            animation: {
                'spin-reverse': 'spin-reverse 0.75s linear infinite',
                'spin-reverse-faster': 'spin-reverse 0.5s linear infinite'
            },
            keyframes: {
                'spin-reverse': {
                    '0%': { transform: 'rotate(360deg)' },
                    '100%': { transform: 'rotate(0deg)' }
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
