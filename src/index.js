module.exports = (md, options) => {
  //   console.log("===>", md);
  function x(...args) {

    console.log('===arg=>',args)
    // const { tokens } = state;
    // console.log("tokens==>", tokens);

    // for (let item of tokens) {
    //   item.attrs ? item.attrs.concat(["data-b","22"]) : item.attrs;
    // }
  }

  // md.core.ruler.before("linkify", "curly_attributes", x, {
  //   title: "2222",
  //   alt: ["paragraph", "reference"],
  // });
  // console.log('md=>',md.renderer)

  if(md){
    md.renderer.rules.html_block=x
  }
  return true;
};
