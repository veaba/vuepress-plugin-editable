module.exports = {
  // plugins: [["vuepress-plugin-editable"], {}],
  title: "Vuepress-plugin-editable",
  plugins: [[require("../../src/index")]],
  themeConfig: {
    repo: "veaba/vuepress-plugin-editable",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Demo", link: "/demo" },
    ],
  },
};
