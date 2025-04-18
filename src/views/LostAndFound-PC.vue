<template>
  <div class="pc-page">
    <h1 class="title">寻物启事-PC版</h1>
    <button class="nav-button" @click="goToPage('/PCPage')">
      <span class="icon">⬅️</span>
      <span>返回首页</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* 样式与Privacy-PC.vue相同 */
</style>