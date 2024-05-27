/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Note Taking PWA`,
    description: `A progressive web app for note-taking.`,
    author: `@Kehinde`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `note-app-pwa`,
        short_name: `NotePWA`,
        start_url: `/`,
        background_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, 
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
  ],
}
