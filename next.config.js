const { i18n } = require("./next-i18next.config");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//     fontLoaders: [
//       { loader: "@next/font/google", options: { subsets: ["latin"] } },
//     ],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,

  // i18n: {
  //   // providing the locales supported by your application
  //   locales: ["en-US", "es-ES", "it-IT"],
  //   //  default locale used when the non-locale paths are visited
  //   defaultLocale: "en-US",
  // },
};

module.exports = nextConfig;
