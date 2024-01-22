<template>
  <div v-if="hospitalList.length !== 0">
    <div class="card-container">
      <template v-for="hospital in hospitalList" :key="hospital.id">
        <el-card class="box-card" shadow="hover" @click="handleClick(hospital.hoscode)">
          <div class="hos-describe">
            <div class="hos-describe__name">
              {{ hospital.hosname }}
            </div>
            <div class="hos-describe__tips">
          <span class="hos-describe__tips__level">
            <el-icon><StarFilled/></el-icon>
            <span>{{ hospital.param.hostypeString }}</span>
          </span>
              <span class="hos-describe__tips__time">
            <el-icon><Clock/></el-icon>
            <span>每天{{ hospital.bookingRule?.releaseTime }}放号</span>
          </span>
            </div>
          </div>
          <div class="hos-image">
            <img :src="`data: image/jpeg; base64, ${hospital.logoData}`" alt="">
          </div>
        </el-card>
      </template>
    </div>
  </div>
  <div v-else>
    <el-empty :image-size="200"/>
  </div>
  <div class="card-pagination">
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import {Clock, StarFilled} from "@element-plus/icons-vue";
import {PropType} from "vue";
import {HospitalDetail} from "@/components/hospital-card/type.ts";

const emit = defineEmits(["handleSize", "handleCurrent", "handleToDetail"])

defineProps({
  hospitalList: {
    type: Array as PropType<Array<HospitalDetail>>,
    default: () => [],
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  }
})

function handleSizeChange(size: number) {
  emit("handleSize", size)
}

function handleCurrentChange(currentPage: number) {
  emit("handleCurrent", currentPage)
}

function handleClick(code: string) {
  emit("handleToDetail", code)
}
</script>

<style lang="scss" scoped>
.card-container {
  min-height: 50vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;

  .box-card {
    width: 48%;
    max-height: 100px;
    margin-bottom: 20px;

    :deep(.el-card__body) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .hos-describe {
      &__name {
        font-size: 20px;
      }

      &__tips {
        color: #7f7f7f;
        margin-top: 20px;
        display: flex;

        &__level {
          display: flex;

          span {
            margin-left: 5px;
          }
        }

        &__time {
          margin-left: 100px;
          display: flex;

          span {
            margin-left: 5px;
          }
        }
      }
    }


    .hos-image {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}

.card-pagination {
  display: flex;
  justify-content: center;
}
</style>