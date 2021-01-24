const { resolve } = require("path");
module.exports = (options, ctx) => {
  return {
    name: "vuepress-plugin-editable",
    extendMarkdown(md) {
      md.use(require("./line"), ctx);
    },
    extendPageData($page) {
      const { _context, _filePath = "" } = $page;
      const cwdLen = _context.cwd.length;
      $page.remoteRelativePath = _filePath.substr(cwdLen).replace(/\\/g, "/");
    },
    enhanceAppFiles: [resolve(__dirname, "enhanceAppFiles.js")],
    globalUIComponents: "EditableReview",
    define:{
      CAN_REVIEW:options.canReview
    },
    clientRootMixin: resolve(__dirname, "client.js"),
  };
};
