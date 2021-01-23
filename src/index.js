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
    // async generated(pagePaths) {
    //   console.log("pagePaths==>", pagePaths);
    // },

    // 奇怪，dev 下没有执行这一段，
    // 后发现是dev 编译到内存没有更新引发
    extendMarkdown(md) {
      md.use(require("./plugin"),ctx);
    },
  };
};
