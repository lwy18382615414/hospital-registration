<template>
  <div class="top">
    <div class="content">
      <div class="left">
        <img src="../../assets/images/logo.png" alt="" >
        <span>尚医通 预约挂号同一平台</span>
      </div>
      <div class="right">
        <span class="help-center">帮助中心</span>
        <span class="login-register">登录/注册</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999999;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 8px 0 rgba(0 0 0 / 30%);
  background: #fff;
  .content {
    width: 75vw;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 20px;
      color: #55a6fe;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .right {
      color: #666;
      .login-register {
        margin-left: 10px;
      }
    }
  }
}
</style>