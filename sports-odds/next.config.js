/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.csv$/,
  //     loader: "csv-loader",
  //     options: {
  //       dynamicTyping: true,
  //       header: true,
  //       skipEmptyLines: true,
  //     },
  //   });

  //   return config;

  // },
  // images: {
  //   loader: "akamai",
  //   path: "/",$

  // },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/NFL": { page: "/NFL" },
      "/NBA": { page: "/NBA" },
      "/NHL": { page: "/NHL" },
      "/WNBA": { page: "/WNBA" },
      "/CFB": { page: "/CFB" },
      "/MLB": { page: "/MLB" },
      "/MCBB": { page: "/MCBB" },
      "/WCBB": { page: "/WCBB" },
      "/login": { page: "/login" },
      "/profile": { page: "/profile" },
    };
  },
};

module.exports = nextConfig;
