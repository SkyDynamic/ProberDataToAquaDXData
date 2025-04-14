<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { Moon, Sunny, Menu, ArrowDown } from "@element-plus/icons-vue";
import router from "@/router";

const isDark = useDark();

const isMobile = () => {
  return window.innerWidth <= 768;
};

function handleDropdownMenu(index: string) {
  router.push(index)
}

function openUrl(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.target = "_blank"
  a.click()
  a.remove()
}
</script>

<template>
  <el-header class="of-hidden backdrop-blur-lg">
    <el-row align="middle" justify="space-between" class="header-row">
      <div style="padding: 1em">查分器数据转AquaDX数据</div>
      <el-divider direction="vertical" />
      <el-menu
          mode="horizontal"
          class="menu"
          v-if="!isMobile()"
          router
      >
        <el-menu-item index="divingfish">水鱼查分器</el-menu-item>
        <el-menu-item index="lxns">落雪查分器</el-menu-item>
      </el-menu>
      <el-dropdown
          trigger="click"
          class="dropdown-menu"
          v-if="isMobile()"
          @command="handleDropdownMenu"
      >
        <span>
          查分器
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="divingfish">水鱼查分器</el-dropdown-item>
            <el-dropdown-item command="lxns">落雪查分器</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button
        @click="() => {
          openUrl('https://github.com/SkyDynamic/ProberDataToAquaDXData')
        }"
        type="text"
        style="margin-left: auto;"
        text
      >
        Github
      </el-button>
      <el-switch
          v-model="isDark"
          style="
          --el-switch-on-color: #7766ff;
          --el-switch-off-color: #ff7744;
        "
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          class="p-4"
      />
    </el-row>
  </el-header>
</template>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: transparent;
}

.header-row {
  width: 100%;
}

.menu {
  flex: 5;
  border-bottom: none;
  background-color: transparent;
}

.switch-container {
  margin-right: 1rem;
}

.menu-switch-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .dropdown-menu {
    display: block;
  }

  .el-page-header {
    width: auto;
    margin-right: 1rem;
  }

  .el-switch {
    margin-left: auto;
  }
}
</style>
