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
      // TODO 后期处理为可配置的地址
      githubOAuthUrl:
        "https://github.com/login/oauth/authorize?client_id=Iv1.f8c5b24e304d03c9&amp;redirect_uri=http://127.0.0.1:8081/api/redirect/github",
      updatePRAPI: "http://127.0.0.1:8081/api/content/update",
    };
  },
  mounted() {
    const targetNode = document.querySelector("body");
    let isEditable = null;
    const dblClick = (event) => {
      const currentLine = event.target.getAttribute("data-editable-line");
      if (currentLine || currentLine != null) {
        isEditable = event.target.getAttribute("contenteditable");

        let oAuth = "Github OAuth";
        if (!this.isOAuthStatus()) {
          this.createMenu(event, { oAuth });
        } else {
          if (this.isPlainText(event.target)) {
            //  plain text
            this.createMenu(event, {
              apply: "应用",
              restore: "还原",
            });
          } else {
            //  complex text
            this.createMenu(event, {
              update: "修改",
              restore: "还原",
            });
          }
        }

        event.target.setAttribute("contenteditable", true);
        event.target.classList.add("focus-editable");
        // TODO 这里的 content 或许需要转换为 markdown 处理
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
    this.saveAccessToken();
  },
  methods: {
    saveAccessToken() {
      const accessToken = this.$route.query.accessToken;
      if (
        this.$route.query.accessToken &&
        !sessionStorage.githubOAuthAccessToken
      ) {
        sessionStorage.githubOAuthAccessToken = accessToken;
      }
    },
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
     * @param menuMap {
        apply: "应用",
        restore: "还原", // redirect update
        update: "修改" // call console ui
     }
     */
    createMenu(event, btnWords) {
      const parenNode = document.createElement("strong");
      parenNode.classList.add("editable-menu");
      parenNode.classList.add("no-need-close");
      parenNode.setAttribute("contenteditable", false);
      const vNode = document.createDocumentFragment();

      for (let key in btnWords) {
        let childNode = null;
        if (key !== "oAuth") {
          childNode = document.createElement("span");
        } else {
          childNode = document.createElement("a");
          childNode.href = this.githubOAuthUrl + "?reference=" + location.href;
        }
        childNode.innerHTML = btnWords[key];
        childNode.setAttribute("contenteditable", false);
        childNode.classList.add("no-need-close");
        childNode.classList.add("editable-" + key);
        vNode.appendChild(childNode);
      }
      parenNode.appendChild(vNode);
      event.target.appendChild(parenNode);
    },
    /**
     * remove menu
     */
    removeMenu() {
      const editMenu = document.querySelector(".editable-menu");
      editMenu && editMenu.remove();
    },

    bindMenuEvent(event) {
      if (
        event.target.classList.contains("editable-apply") ||
        event.target.classList.contains("editable-update")
      ) {
        this.updatePR(event);
      }
      if (event.target.classList.contains("editable-restore")) {
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
    updatePR(event) {
      const repoPrefix = this.$themeConfig.repo || "";
      if (!repoPrefix || !repoPrefix.length) {
        console.warn("Warning: You have not set the repo url");
      }
      const node = document.querySelector(".focus-editable");
      const menuNode = document.querySelector(".editable-menu");
      node.removeChild(menuNode);
      const content = node.innerHTML;
      const line = node.getAttribute("data-editable-line");

      console.log("PR===>", event.target);
      console.log("发起PR ==>", {
        repoPrefix,
        remoteRelativePath: this.$page.remoteRelativePath,
        content,
        line,
      });
      // -----------------------------
      if (this.isPlainText(event.target)) {
        console.log("single=>");
        const { owner, repo } = this.getOwnerRepo(repoPrefix);
        this.postSinglePR(
          owner,
          repo,
          this.$page.remoteRelativePath, // 可能多余斜杠问题
          content,
          line
        );
      } else {
        console.log("todo mult");

        bus.$emit("showReview", {
          status: true,
          repoPrefix,
          remoteRelativePath: this.$page.remoteRelativePath,
          oldContent: this.preNodeContent,
          line,
          content,
        });
      }
    },
    /**
     * handler plain text PR
     */
    postSinglePR(owner, repo, path, content, line) {
      console.log("arguments=>", arguments);
      fetch(this.updatePRAPI, {
        body: JSON.stringify({
          owner,
          repo,
          path,
          content,
          line: Number(line),
        }),
        mode: "cors",
        method: "POST",
        headers: new Headers({
          AccessToken: sessionStorage.githubOAuthAccessToken,
          "Content-Type": "Application/json",
        }),
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // *client, no-referrer
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data=>", data);
          const { code, message } = data || {};
          switch (code) {
            case 0:
              alert(
                "success! see =>" + "https://github.com/" + owner + "/" + repo
              );
              break;
            case 401:
              sessionStorage.removeItem("githubOAuthAccessToken");
              location.href = this.$route.path;
              console.warn("access token 失效", message);
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    },
    // this.reloadPage();
    /**
    * @return {
      owner,
      repo
    }
    */
    getOwnerRepo(ownerRepo) {
      const strArr = ownerRepo.split("/");
      return {
        owner: strArr[0] ? strArr[0] : "",
        repo: strArr[1] ? strArr[1] : "",
      };
    },
    reloadPage(event) {
      location.reload();
    },

    /**
     * 判断是否是纯文本
     * @TODO 纯文本，直接在当前行 可发起 PR
     * @TODO 非纯文本，需要进一步打开控制台来手动编辑
     * @return {boolean}
     */
    isPlainText(node) {
      if (node.children.length) return false;
      else return true;
    },
    /*
     * 判断是否授权过，即检查本地是否存储 access token
     * @return  {boolean}
     */
    isOAuthStatus() {
      if (
        sessionStorage.githubOAuthAccessToken &&
        sessionStorage.githubOAuthAccessToken.length === 40
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
