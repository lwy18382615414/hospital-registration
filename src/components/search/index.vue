<template>
  <div class="search-container">
    <div style="width: 40%">
      <el-popover
          popper-class="hosname-el-popover"
          placement="bottom-start"
          width="29%"
          trigger="focus"
          :show-arrow="false"
      >
        <template #reference>
          <el-input
              v-model="searchValue"
              placeholder="输入医院名称关键字"
              @input="handleInput"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <search/>
              </el-icon>
            </template>
          </el-input>
        </template>
        <template v-if="hosList.length">
          <div v-loading="loading">
            <div v-for="item in hosList" :key="item.id" class="hosname">
              {{ item.hosname }}
            </div>
          </div>
        </template>
        <el-empty v-else/>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {PropType, ref, watch} from "vue";
import {HospitalDetail} from "@/components/hospital-card/type.ts";

const emit = defineEmits(["handleInput"])

const props = defineProps({
  hosList: {
    type: Array as PropType<Array<HospitalDetail>>,
    default: () => []
  }
})

const searchValue = ref('');
const loading = ref(true)

watch(
    () => props.hosList,
    () => {
      loading.value = false
    }
)

function handleInput(value: string) {
  emit("handleInput", value);
}

</script>

<style lang="scss" scoped>
.search-container {
  text-align: center;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

:deep(.el-input__wrapper) {
  margin-right: 20px;
}

</style>