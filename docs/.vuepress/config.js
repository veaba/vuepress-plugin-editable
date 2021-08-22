module.exports = {
  title: "Vuepress-plugin-editable",
  plugins: [
    [
      require("../../src/index"),
      {
        appDomain: "https://bot.veaba.me",
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
