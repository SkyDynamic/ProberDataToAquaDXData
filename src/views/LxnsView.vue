<script setup lang="ts">
import { QuestionFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { exportToAquadxScore, getScores } from "@/core/LxnsProberUtils.ts";
import { ElMessage } from "element-plus";

const token = ref('')
const canExport = ref(true)
const canDownload = ref(false)
const downloadUrl = ref('')

async function clickLogin() {
  const [success, result] = await getScores(token.value)
  if (success) {
    ElMessage.success('获取成绩成功, 开始转换')
    const data = await exportToAquadxScore(result)
    downloadUrl.value = URL.createObjectURL(new Blob([JSON.stringify(data)]))
    canDownload.value = true
    ElMessage.success('转换成功')
  } else {
    ElMessage.error(result as string)
  }
}

async function downloadResult() {
  if (downloadUrl.value) {
    const a = document.createElement('a')
    a.href = downloadUrl.value
    a.download = 'result.json'
    a.click()
  }
}
</script>

<template>
  <div style="padding-top: 1rem">
    <el-row justify="center">
      <el-space direction="vertical" alignment="center" :size="20">
        <el-text size="large">落雪查分器</el-text>

        <el-space direction="horizontal" alignment="center" :size="10">
          <el-input v-model="token" style="width: 20em; height: 4em" type="text" clearable placeholder="请输入API Token" />
          <el-popover
              placement="top"
              trigger="hover"
              title="如何获取Token"
              content="登录落雪查分器 -> 账号详情 -> 个人API密钥 -> 复制Token"
              :width="400"
          >
            <template #reference>
              <el-button :icon="QuestionFilled" circle />
            </template>
          </el-popover>
        </el-space>

        <el-button type="primary" style="margin-left: 10px" @click="clickLogin" :disabled="!canExport">登录并转换数据</el-button>
      </el-space>
    </el-row>
  </div>

  <div style="padding-top: 2rem">
    <el-row justify="center">
      <el-button type="primary" @click="downloadResult" :disabled="!canDownload">下载结果</el-button>
    </el-row>
  </div>
</template>

<style scoped>

</style>