module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    overrides: [
        {
            files: ['*.jsx', '*.tsx'],
            rules: {
                'react-hooks/rules-of-hooks': 'error'
            }
        }
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'off',
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-explicit-any': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ]
    }
};
