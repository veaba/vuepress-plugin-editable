<template>
  <div
    v-if="eventData.status"
    class="editable-review"
    :style="{
      'z-index': this.eventData.status ? 0 : -1,
    }"
  >
    <div class="editable-review-code">
      <div class="editable-origin-code editable-review-body">
        <p>
          {{ eventData.oldContent }}
        </p>
      </div>

      <!--
        TODO: get source markdown file view, like setting english origin version repo  
        <div class="edittable-source-code"></div>
        -->
      <div class="editable-new-code editable-review-body">
        <p>
          {{ eventData.content }}
        </p>
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
  methods: {},
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