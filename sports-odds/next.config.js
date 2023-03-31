// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   module: {
//     rules: [
//       {
//         test: /\.csv$/,
//         loader: "csv-loader",
//         options: {
//           dynamicTyping: true,
//           header: true,
//           skipEmptyLines: true,
//         },
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: "csv-loader",
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });

    return config;
  },
  images: {
    loader: "akamai",
    path: "/",
  },
};
