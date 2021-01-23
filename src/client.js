// 要素1
// 当前行数
/**
 *
 * @param sourcePath {string}
 * @param line {number}
 * @param content {string}
 * */
function pullRequest(sourcePath, line, content) {
  // TODO
  console.log("发起PR===>", sourcePath, line, content);
}

export default {
  mounted() {
    const targetNode = document.querySelector("body");
    const dblClick = (event) => {
      console.log("event=>");
      const editableLine = event.target.getAttribute("data-editable-line");
      if (editableLine || editableLine != null) {
        const repoPrefix = this.$themeConfig.repo || "";
        if (!repoPrefix || !repoPrefix.length) {
          console.warn("Warning: You have not set the repo url");
        }
        const sourcePath = repoPrefix + this.$page.relativePath;
        console.log("TODO pull pr to==>", sourcePath);
        const content = event.target.innerHTML;

        const isEditable = event.target.getAttribute("contenteditable");
        if (!isEditable) {
          event.target.setAttribute("contenteditable", true);
        } else event.target.setAttribute("contenteditable", "");
        // todo
        pullRequest(sourcePath, editableLine, content);

        // TODO 这里的content 或许需要转换为 markdown 处理
      }
    };

    if (targetNode) {
      targetNode.removeEventListener("dblclick", dblClick);
      targetNode.addEventListener("dblclick", dblClick);
    }

    // TODO: 移除圈外则恢复原始，
    // TODO 再通过按钮设置发起 PR
    // TODO: 存储原始内容
  },
};
