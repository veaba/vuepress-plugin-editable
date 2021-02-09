<!--
文件行数 定位
-->
<template>
  <div class="editable-lines">
    <span v-for="item in lines" :key="item">{{ item }}</span>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Number,
    },
  },
};
</script>
<style scoped>
.editable-lines {
  /* width: 80px; */
  background-color: #fff;
  padding: 130px 0 0 15px;
}
.editable-lines > span {
  display: block;
}
</style>