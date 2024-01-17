<template>
  <div class="bottom">
    <div class="content">
      <div class="left">京ICP备19004658号 京网文〔2020〕1039-165号</div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .bottom {
    width: 100%;
    height: 50px;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    font-size: 12px;
    .content {
      width: 75vw;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right {
        span {
          margin: 0 10px;
          cursor: pointer;
        }
        span:hover{
          color: #0463c9;
        }
      }
    }
  }


</style>