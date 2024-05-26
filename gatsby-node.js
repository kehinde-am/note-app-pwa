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
