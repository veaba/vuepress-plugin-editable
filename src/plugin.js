// markdown plugin
module.exports = (md, ctx) => {
  console.log("执行 plugin ", Object.keys(md));
  console.log()

  for(let key in ctx){
    console.log('ctx=>',key,ctx[key])
  }
  function setLine({ tokens = [] }) {
    // console.log("tokens==>",tokens);
    for (let i = 0; i < tokens.length; i++) {
      const item = tokens[i];
      // todo 无法捕捉到纯 HTML
      console.log("item==>", item);
      if (item.nesting !== -1) {
        item.attrs = [["data-editable-line", i]];
        // TODO 如何把行数给打上去
      }
    }
  }

  /**
   * @TODO 将 Markdown file 的行数打印出来
   * 1. 根目录开始的完整路径
   * 2. 行数
   *
   */
  function getLineNumOfMarkdown(path) {}
  /**
   * @TODO generate attr
   *
   * @return [name,value]
   */
  function generateAttrs() {}
  /**
   * @TODO 环境检测
   *
   */
  function checkEnv() {}

  /**
   * @TODO git 检测
   *
   */
  function isGitOk() {}
  md.core.ruler.before("linkify", "editable", setLine);
};


/**
 * 
 * 
 * 
 * 
 * 1. fs 读取内容，再与token 对比相同，由于是路径完全一致，这保证了结构也是一致
 * 
 * 
 * 
 * 
 * */ 
