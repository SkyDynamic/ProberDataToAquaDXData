<script setup lang="ts">

import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <TopBar class="fixed w-full h-16 z-2 border-solid b-0 b-b-1 border-[var(--el-border-color)]" />
  <el-scrollbar
      class="fixed z-1 bottom-0 right-0 w-full md:pl-48 FIX"
  >
    <div class="h-16 block">&nbsp;</div>
    <router-view />
  </el-scrollbar>
</template>

<style scoped>

</style>