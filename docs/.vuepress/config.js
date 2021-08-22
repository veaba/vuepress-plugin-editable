module.exports = {
  title: "Vuepress-plugin-editable",
  plugins: [
    [
      require("../../src/index"),
      {
        appDomain: "http://127.0.0.1:8081",
      },
    ],
  ],
  themeConfig: {
    repo: "veaba/vuepress-plugin-editable",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Demo", link: "/demo" },
    ],
  },
};
