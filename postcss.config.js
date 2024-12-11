import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwindcss from 'tailwindcss';
import postcssNesting from 'postcss-nesting';
import postcssImport from 'postcss-import';
import postcssApply from 'postcss-apply';
import process from 'process';

const config = {
    plugins: [
        postcssApply,
        postcssImport,
        postcssNesting,
        postcssNested,
        tailwindcss,
        autoprefixer,
        ...(process.env.NODE_ENV === 'production' ? [cssnano] : [])
    ]
};

export default config;
