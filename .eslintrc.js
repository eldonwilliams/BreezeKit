module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js', '/dist', '/examples', '/node_modules'],
}