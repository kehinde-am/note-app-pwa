/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/edit-note/)) {
    page.matchPath = "/edit-note/*";
    createPage(page);
  }

  if (page.path.match(/^\/share-note/)) {
    page.matchPath = "/share-note/*";
    createPage(page);
  }
};





