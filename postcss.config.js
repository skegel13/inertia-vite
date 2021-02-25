// Since we are not using Laravel Mix, we needed a dedicated PostCSS config for
// Tailwind.
module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
