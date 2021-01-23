const { resolve } = require("path");
module.exports = (options, ctx) => {
  return {
    name: "vuepress-plugin-editable",
    multiple: true,
    // 钩子在应用初始化之后，并在某些特定的函数式 API 执行之前执行
    // 这些函数式 API 包括： clientDynamicModules enhanceAppFiles
    // async ready(...args) {
    //   console.log("ready==>", args);
    // },
    // updated(...args) {
    //   console.log("updated==>", args);
    // },
    async generated(pagePaths) {
      console.log("pagePaths==>", pagePaths);
    },

    extendMarkdown(md) {
      // console.info('==>', resolve(__dirname, 'client.js'));
      md.use(require("./line"), ctx);
    },
    extendPageData($page) {
      const { _context, _filePath = "" } = $page;
      const cwdLen = _context.cwd.length;
      $page.remoteRelativePath = _filePath.substr(cwdLen).replace(/\\/g, "/");
    },
    // enhanceAppFiles: require('./client.js')
    clientRootMixin: resolve(__dirname, "client.js"),
  };
};
