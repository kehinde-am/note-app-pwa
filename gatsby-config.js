/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Note Taking PWA",
    description: "A progressive web app for note-taking with offline access.",
    author: "Kehinde Amusa",
    siteUrl: "https://github.com/kehinde-am/note-app-pwa",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Note Taking PWA",
        short_name: "NotePWA",
        start_url: "/",
        background_color: "#09090f",
        theme_color: "#8b5cf6",
        display: "standalone",
        icon: "src/images/icon.svg",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-postcss",
  ],
}
