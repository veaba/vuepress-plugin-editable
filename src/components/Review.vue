<template>
  <div
    v-if="eventData.status"
    class="editable-review"
    :style="{
      'z-index': this.eventData.status ? 0 : -1,
    }"
  >
    <div class="editable-review-warp">
      <div class="editable-review-code">
        <div class="editable-origin-code editable-review-body">
          <h3>old content</h3>
          <p>
            {{ eventData.oldContent }}
          </p>
        </div>

        <!--
        TODO: get source markdown file view, like setting english origin version repo  
        <div class="edittable-source-code"></div>
        -->
        <div class="editable-new-code editable-review-body">
          <h3>new content</h3>
          <p>
            {{ eventData.content }}
          </p>
        </div>
      </div>

      <div class="editable-review-btn">
        <button>应用</button>
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
export default {
  mounted() {
    bus.$on("showReview", (data) => {
      this.eventData = data;
    });
  },
  data() {
    return {
      eventData: {
        status: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.eventData.status = false;
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