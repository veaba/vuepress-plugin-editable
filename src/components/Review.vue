<template>
  <div
    v-if="eventData.status"
    class="editable-review"
    :style="{
      'z-index': this.eventData.status ? 0 : -1,
    }"
  >
    <div class="editable-review-warp">
      <Position :lines="breakLines"></Position>
      <!-- TODO: Get English version content-->
      <div class="editable-review-code">
        <!-- <div class="editable-origin-code editable-review-body">
          <h3>old content</h3>
          <pre class="origin-content">
            <code>
            {{ eventData.originContent }}
            </code>
          </pre>
        </div>  -->

        <!--
        TODO: get source markdown file view, like setting english origin version repo  
        <div class="edittable-source-code"></div>
        -->
        <div class="editable-new-code editable-review-body">
          <p>
            Powered by
            <a
              href="https://github.com/veaba/vuepress-plugin-editable/"
              target="_blanck"
            >
              vuepress-plugin-editable
            </a>
            and
            <a href="https://github.com/veaba/veaba-bot/" target="_blanck">
              veaba-bot
            </a>
          </p>
          <!-- `<pre>` elements and content are not on the same line, there will be indentation problems.-->
          <pre
            class="editable-new-content"
            contenteditable="true"
            @input="onChange"
            @focus="onFocus"
            @blur="onBlur"
            >{{ eventData.content }}</pre
          >
          <!-- btn -->
          <div class="editable-review-btn">
            <button @click="onApplyPullRequest" :disabled="disabled">
              应用
            </button>
            <button @click="closeModal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
TODO: 由于渲染逻辑较为复杂，所以这里不好直接应用content 作为新更改的数据
-->
<script>
import bus from "../eventBus";
import { updatePRAPI, fetchOps } from "../config";
import Position from "./Position";
export default {
  mounted() {
    this.originContentLine = this.countOriginContent(this.eventData.content);
    bus.$on("showReview", (data) => {
      this.eventData = data;
      this.originContentLine = this.countOriginContent(data.content);
    });
  },
  components: { Position },
  data() {
    return {
      eventData: {
        // test data
        // content:
        //   "## 使用插件\n\n在使用 `createApp()` 初始化 Vue 应用程序后，你可以通过调用 `use()` 方法将插件添加到你的应用程序中。\n\n我们将使用在[编写插件](#编写插件)部分中创建的 `i18nPlugin` 进行演示。\n\n`use()` 方法有两个参数。第一个是要安装的插件，在这种情况下为 `i18nPlugin`。\n\n它还会自动阻止你多次使用同一插件，因此在同一插件上多次调用只会安装一次该插件。\n\n第二个参数是可选的，并且取决于每个特定的插件。在演示 `i18nPlugin` 的情况下，它是带有转换后的字符串的对象。\n",
        content: "",
        status: false,
      },
      disabled: false,
      originContentLine: 0,
      otherDivLine: 0,
    };
  },
  computed: {
    breakLines() {
      // todo 内容被清空的时候
      return this.originContentLine + this.otherDivLine;
    },
  },
  methods: {
    countOriginContent(nodeOrContent, isNode) {
      let lines = 0;
      if (nodeOrContent) {
        let text = "";
        if (isNode) {
          text = nodeOrContent.textContent;
        } else {
          text = nodeOrContent;
        }
        for (let i in text) {
          if (text[i] === "\n") lines++;
        }
      }
      return lines;
    },
    closeModal() {
      this.eventData.status = false;
    },
    debounce(fn, wait) {
      let timer = 0;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, wait);
      };
    },
    /**
     * contenteditable input event generate div element
     */
    onChange(event) {
      this.otherDivLine = (event.target.children || []).length;
      const firstTextNode = event.target.childNodes[0];
      const w = this;
      // todo 防抖函数
      this.debounce(() => {
        if (firstTextNode === undefined) w.originContentLine = 1;
        w.originContentLine = w.countOriginContent(firstTextNode, true);
      }, 100)();
    },
    // bug:
    onFocus() {
      console.log("focus=>");
    },
    onBlur() {
      console.log("blur=>");
    },
    onApplyPullRequest() {
      this.disabled = true;
      // return;
      // fetch("updatePRAPI", {
      const contentNode = document.querySelector(".editable-new-content");
      const content = contentNode && contentNode.innerText;
      fetch(updatePRAPI, {
        body: JSON.stringify({
          owner: this.eventData.owner,
          repo: this.eventData.repo,
          path: this.eventData.path,
          content: content,
        }),
        method: "POST",
        ...fetchOps,
        headers: new Headers({
          "Access-Token": sessionStorage.githubOAuthAccessToken,
          "Content-Type": "Application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.disabled = false;
          if (data.code === 0) {
            alert(
              "success see: htts://github.com/" +
                this.eventData.owner +
                "/" +
                this.eventData.repo
            );
            // todo reloade page
          } else {
            console.warn(data);
          }
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.editable-review {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
</style>