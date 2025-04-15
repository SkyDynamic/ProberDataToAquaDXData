<script setup lang="ts">

import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <TopBar class="fixed w-full h-16 z-2 border-solid b-0 b-b-1 border-[var(--el-border-color)]" />
  <el-scrollbar
      class="fixed z-1 bottom-0 right-0 w-full FIX"
  >
    <div class="h-16 block">&nbsp;</div>
    <router-view />
  </el-scrollbar>
  <el-footer
      class="fixed z-1 bottom-0 right-0 w-full FIX"
  >
    <el-row justify="center">
      <el-col :span="24">
        <el-divider>
          <span class="text-xs">
            Develop by <a href="https://github.com/SkyDynamic" target="_blank">SkyDynamic</a>
          </span>
        </el-divider>
      </el-col>
    </el-row>
  </el-footer>
</template>

<style scoped>

</style>