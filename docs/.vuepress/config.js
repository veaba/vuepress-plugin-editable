const editable = require("../../src/");
module.exports = {
  plugins: [[editable]],
  markdown: {
    extendMarkdown: (md) => {
      md.use(editable);
    },
  },
};
