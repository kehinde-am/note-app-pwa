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

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /undici/,
            use: loaders.null(),
          },
          {
            test: /node:stream/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
