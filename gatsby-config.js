module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: {
          patterns: [`components/*.*`],
          options: { nocase: true }
        }
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ticTacToe`,
        short_name: `ticTacToe`,
        start_url: `/`,
        background_color: `#121022`,
        theme_color: `#121022`,
        display: `minimal-ui`,
        icon: `src/assets/img/icon.svg`,
      },
    },
  ],
}
