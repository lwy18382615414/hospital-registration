<template>
  <div class="container">
    <top-bar/>
    <div class="content">
      <router-view></router-view>
    </div>
    <bottom-bar/>
  </div>
</template>

<script setup lang="ts">
import topBar from '@/components/top_bar/index.vue'
import bottomBar from '@/components/bottom_bar/index.vue'
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 75vw;
    height: 100%;
    margin-top: 70px;
  }
}
</style>