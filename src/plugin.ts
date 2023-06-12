import tailwindcssPlugin from 'tailwindcss/plugin';

export const plugin = tailwindcssPlugin(() => {}, {
  content: {
    files: [
      './src/components/**/*.tsx',
    ],
  },
});

export default plugin;
