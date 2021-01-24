import "./style.css";
import bus from "./eventBus";
export default {
  data() {
    return {
      preLine: null,
      preNode: null,
      preNodeContent: null, // current old content
      // TODO 通过本插件提交后有记录
      // pendingPRData:[]
    };
  },
  mounted() {
    const targetNode = document.querySelector("body");
    let isEditable = null;
    const dblClick = (event) => {
      const currentLine = event.target.getAttribute("data-editable-line");
      if (currentLine || currentLine != null) {
        isEditable = event.target.getAttribute("contenteditable");
        event.target.setAttribute("contenteditable", true);
        event.target.classList.add("focus-editable");
        this.createMenu(event);
        // TODO 这里的content 或许需要转换为 markdown 处理
        this.preLine = currentLine;
        this.preNode = event.target;
        // TODO temp handler 实际上这种处理方式欠妥
        this.preNodeContent = event.target.innerHTML.replace(
          /<strong(.+?)strong>/g,
          ""
        );
        //
      }
    };

    if (targetNode) {
      targetNode.removeEventListener("dblclick", dblClick);
      targetNode.addEventListener("dblclick", dblClick);
      targetNode.removeEventListener("click", this.outsideClick);
      targetNode.addEventListener("click", this.outsideClick);
    }
  },
  methods: {
    /**
     * click outside
     */
    outsideClick(event) {
      const clickLine = event.target.getAttribute("data-editable-line");
      if (
        this.preLine &&
        clickLine !== this.preLine &&
        !event.target.classList.contains("no-need-close")
      ) {
        this.preNode.removeAttribute("contenteditable");
        this.preNode.classList.remove("focus-editable");
        this.removeMenu();
      }
      this.bindMenuEvent(event);
    },
    /**
     * apply menu
     * restore menu
     *
     */
    createMenu(event) {
      const parenNode = document.createElement("strong");
      parenNode.classList.add("editable-menu");
      parenNode.classList.add("no-need-close");
      parenNode.setAttribute("contenteditable", false);
      const vNode = document.createDocumentFragment();
      const btnWords = {
        apply: "应用",
        restore: "还原",
      };
      for (let key in btnWords) {
        const span = document.createElement("span");
        span.innerHTML = btnWords[key];
        span.setAttribute("contenteditable", false);
        span.classList.add("no-need-close");
        if (key === "apply") span.classList.add("editable-apply");
        else if (key === "restore") span.classList.add("editable-restore");
        vNode.appendChild(span);
      }
      parenNode.appendChild(vNode);
      event.target.appendChild(parenNode);
    },
    /**
     * remove menu
     *
     */
    removeMenu() {
      const editMenu = document.querySelector(".editable-menu");
      editMenu && editMenu.remove();
    },
    bindMenuEvent(event) {
      if (event.target.classList.contains("editable-apply")) {
        this.applyCurrentLinePR(event);
      } else if (event.target.classList.contains("editable-restore")) {
        this.reloadPage(event);
      }
    },
    /**
     * TODO 全篇检查
     * TODO 单行检查
     * @param sourcePath {string}
     * @param line {number}
     * @param content {string}
     * @todo 还要记录此处时候有 PR 关联的更新
     * @TODO 检测长度变化，到底有没有是真的更新
     * @TODO 你有更新需要提交，请确认操作
     * */
    applyCurrentLinePR(event) {
      const repoPrefix = this.$themeConfig.repo || "";
      if (!repoPrefix || !repoPrefix.length) {
        console.warn("Warning: You have not set the repo url");
      }

      const sourcePath = repoPrefix + this.$page.relativePath;

      const node = document.querySelector(".focus-editable");
      const menuNode = document.querySelector(".editable-menu");
      node.removeChild(menuNode);
      const content = node.innerHTML;
      const line = node.getAttribute("data-editable-line");

      console.log("PR===>", event.target);
      console.log("发起PR ==>", {
        sourcePath,
        content,
        line,
      });
      bus.$emit("showReview", {
        status: true,
        sourcePath,
        oldContent: this.preNodeContent,
        line,
        content,
      });
      // this.reloadPage();
    },
    reloadPage(event) {
      location.reload();
    },
  },
};
