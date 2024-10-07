// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "The Edibles",
  siteDescription: "The Edibles",
  plugins: [
    {
      use: "@gridsome/source-graphql",
      options: {
        url:
          (process.env.GRIDSOME_STRAPI_URL || "http://139.59.6.114:1347") +
          "/graphql",
        fieldName: "strapi",
        typeName: "strapiTypes",
      },
    },
    {
      use: "gridsome-plugin-modal",
    },
  ],
  icon: {
    favicon: "./src/assets/img/logo-100x100.png",
    touchicon: "./src/assets/img/logo-100x100.png",
  },
};
