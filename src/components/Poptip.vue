<!-- Poptip -->

<template>
  <div v-if="status" class="editable-poptip" :style="{ borderColor }">
    <div>
      <strong>{{ res.code === 0 ? "Successful!: " : "Warning! " }} </strong>
    </div>
    <div v-if="res.code !== 0">
      <p>
        message: <code class="code">{{ subMessage(res.message) }}</code>
      </p>

      <p v-if="res.code === 403">
        Fork first:
        <a
          v-if="$themeConfig.repo"
          :href="'https://github.com/' + $themeConfig.repo"
          target="_blank"
        >
          {{ $themeConfig.repo }}</a
        >
      </p>
    </div>
    <div v-else>
      See:
      <a :href="res.data && res.data.html_url" target="_blank">
        Pull Request
      </a>
    </div>
  </div>
</template>
<script>
import bus from "../eventBus";
export default {
  data() {
    return {
      borderColor: "#ddd",
      res: {
        code: 0,
        data: "",
        message: "",
      },
      status: false,
    };
  },
  mounted() {
    bus.$on("onReceive", (json = {}, status) => {
      console.log("json==>", json, status);
      const { code, data, message } = json;
      this.res = {
        code,
        data,
        message,
      };

      this.status = status;
      if (code === 0) {
        this.borderColor = "#3eaf7c";
      } else {
        this.borderColor = "#eb7350";
      }

      setTimeout(() => {
        this.status = false;
      }, 5000);
    });
  },
  methods: {
    subMessage(str) {
      return (str || "").replace(/^.*: /g, "");
    },
  },
};
</script>

<style scoped>
.editable-poptip {
  position: fixed;
  border: 1px solid #3eaf7c;
  box-sizing: border-box;
  background: #fff;
  width: 360px;
  bottom: 40px;
  right: 40px;
  padding: 20px;
}
.editable-poptip code {
  color: #476582;
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-size: 0.85em;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
</style>