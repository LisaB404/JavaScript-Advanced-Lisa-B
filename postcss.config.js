module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwindcss')('tailwind.config.js'),
      require('autoprefixer')
    ]
  };