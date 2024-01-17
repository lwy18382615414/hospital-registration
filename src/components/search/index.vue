<template>
  <div class="search-container">
    <el-autocomplete
        clearable
        placeholder="请输入医院名称"
    />
    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.search-container {
  text-align: center;
  margin-top: 20px;

  :deep(.el-input__wrapper) {
    width: 30vw;
    margin-right: 20px;
  }
}
</style>