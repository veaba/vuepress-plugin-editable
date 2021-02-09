<template>
  <div
    v-if="eventData.status"
    class="editable-review"
    :style="{
      'z-index': this.eventData.status ? 0 : -1,
    }"
  >
    <div class="editable-review-warp">
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
          <!---TODO: add line index feature-->
          <pre
            class="editable-new-content"
            contenteditable="true"
            @input="onChange"
            @focus="onFocus"
            @blur="onBlur"
          >
            <code>
              <!-- TODO: contenteditable 与 data 绑定-->
            {{ eventData.content }}
            </code>
          </pre>
        </div>
      </div>

      <div class="editable-review-btn">
        <button @click="onApplyPullRequest" :disabled="disabled">应用</button>
        <button @click="closeModal">关闭</button>
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
export default {
  mounted() {
    bus.$on("showReview", (data) => {
      this.eventData = data;
    });
  },
  data() {
    return {
      eventData: {
        content:
          "\n## 使用插件\n\n在使用 `createApp()` 初始化 Vue 应用程序后，你可以通过调用 `use()` 方法将插件添加到你的应用程序中。\n\n我们将使用在[编写插件](#编写插件)部分中创建的 `i18nPlugin` 进行演示。\n\n`use()` 方法有两个参数。第一个是要安装的插件，在这种情况下为 `i18nPlugin`。\n\n它还会自动阻止你多次使用同一插件，因此在同一插件上多次调用只会安装一次该插件。\n\n第二个参数是可选的，并且取决于每个特定的插件。在演示 `i18nPlugin` 的情况下，它是带有转换后的字符串的对象。\n",
        status: false,
      },
      disabled: false,
      fetchOps: fetchOps,
      tempContent: "",
    };
  },
  methods: {
    closeModal() {
      this.eventData.status = false;
    },
    /**
     * contenteditable input change
     */
    onChange(event) {
      console.log("event=>", event.target.textContent);
      window.x = event;
      // this.$set(this.eventData, "content", event.target.innerText);
      setTimeout(() => {
        this.tempContent = event.target.innerText;
      }, 200);
    },
    // bug:
    onFocus() {
      console.log("focus=>");
      this.tempContent = this.eventData.content;
    },
    onBlur() {
      console.log("blur=>");
    },
    onApplyPullRequest() {
      this.disabled = true;
      // return;
      // fetch("updatePRAPI", {
      fetch(updatePRAPI, {
        body: JSON.stringify({
          owner: this.eventData.owner,
          repo: this.eventData.repo,
          path: this.eventData.path,
          content: this.eventData.content,
        }),
        method: "POST",
        ...this.fetchOps,
      })
        .then((res) => res.json())
        .then((data) => {
          this.disabled = false;
          if (data.code === 0) {
            alert("success see: htts://github.com/" + owner + "/" + repo);
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