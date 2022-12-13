const { join } = require('path');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      'src/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    // ...createGlobPatternsForDependencies(__dirname), // TODO
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

