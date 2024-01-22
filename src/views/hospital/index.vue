<template>
  <div class="hospital-detail">
    <!--  左侧菜单  -->

    <div class="menu">
      <span @click="router.push('/')" class="back">返回首页</span>

      <el-menu :default-active="route.path" class="el-menu-vertical" router>
        <el-menu-item
            v-for="item in menuList"
            :key="item.path"
            :index="item.path"
            :route="{path: item.path, query: {code: route.query.code}}"
        >
          <Icon :name="item.icon"></Icon>
          <span style="margin-left: 10px">{{ item.text }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--  右侧内容  -->
    <div class="content">
      <!--   子组件展示   -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router"
import {computed} from "vue";
import Icon from "@/components/icon/index.vue"


const router = useRouter();
const route = useRoute();

const menuList = computed(() => {
  const hospitalMenu = router.options.routes.filter(route => route.name === "hospital")[0];
  if (hospitalMenu.children?.length) {
    return hospitalMenu.children.map(item => ({
      path: hospitalMenu.path + '/' + item.path,
      text: item.meta?.title,
      icon: item.meta?.icon as string
    }))
  }
})
</script>

<style lang="scss" scoped>
.hospital-detail {
  display: flex;
  height: 100vh;

  .menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .back {
      display: inline-block;
      cursor: pointer;
      font-size: 16px;
      padding: 20px 0;
    }

  }

  .content {
    flex: 8;
    padding: 24px;
  }
}
</style>