<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside class="aside"><List></List></el-aside>
        <el-main><MainChat></MainChat></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MainChat from "./components/MainChat/index.vue";
import List from "./components/List/index.vue";
const msg = ref("Hello Vue 3!");

// const MainChat = ref();
</script>

<style scoped>
.hello {
  padding: 20px;
}
.aside {
  background-color: #f3f0f0;
}
</style>
