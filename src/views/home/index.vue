<template>
  <div>
    <carousel/>
    <search
        :hos-list="hosList"
        @handleInput="handleInput"
    />
    <el-row :gutter="20">
      <el-col :span="18">
        <hospitalSearch
            :level-list="levelList"
            :region-list="regionList"
            @handle-select="handleSelect"
        />
        <!--    医院卡片展示    -->
        <div class="hospital-card">
          <hospital-card
              :hospital-list="hospitalList"
              :page-size="pageSize"
              :current-page="currentPage"
              :total="total"
              @handle-current="handleCurrentChange"
              @handle-size="handleSizeChange"
              @handleToDetail="toHospitalDetail"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <!--    右侧信息    -->
        <div style="margin-top: 50px">
          <!--    常见科室    -->
          <div class="common-department">
            <div class="common-department__header">
              <div style="font-weight: 700; color:#333; font-size: 16px">常见科室</div>
              <div style="display: flex; color: #999999">
                <span>全部</span>
                <el-icon color="#409EFC">
                  <ArrowRight/>
                </el-icon>
              </div>
            </div>
            <div class="common-department__content">
              <div v-for="item in COMMON_DEPARTMENT"
                   :key="item.value"
                   class="common-department__content__text"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <!--    平台公告    -->
          <div class="platform-notice">
            <div class="platform-notice__header">
              <div style="display: flex; font-size: 16px; font-weight: 700; color: #333">
                <span>平台公告</span>
              </div>
              <div style="display: flex; color: #999999">
                <span>全部</span>
                <el-icon color="#409EFC">
                  <ArrowRight/>
                </el-icon>
              </div>
            </div>
            <div class="platform-notice__content">
              <div v-for="item in PLATFORM_NOTICE" :key="item.id" class="platform-notice__content__wrapper">
                <div class="platform-notice__content__wrapper__dot"></div>
                <div class="platform-notice__content__wrapper__text">
                  <el-tooltip
                      :content="item.text"
                      placement="top-start"
                      effect="dark"
                  >
                    {{ item.text }}
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
          <!--    停诊公告    -->
          <div class="pause-notice">
            <div class="pause-notice__header">
              <div style="color: #333; font-weight: 700; font-size: 16px">停诊公告</div>
              <div style="display: flex; color: #999999">
                全部
                <el-icon color="#409EFC">
                  <ArrowRight/>
                </el-icon>
              </div>
            </div>
            <div class="pause-notice__content">
              <div v-for="item in PAUSE_NOTICE" :key="item.id" class="pause-notice__content__wrapper">
                <div class="pause-notice__content__wrapper__dot"></div>
                <div class="pause-notice__content__wrapper__text">
                  <el-tooltip
                      :content="item.text"
                      placement="top-start"
                      effect="dark"
                  >
                    {{ item.text }}
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import carousel from '@/components/carousel/index.vue'
import search from '@/components/search/index.vue'
import hospitalSearch from '@/components/hospital-search/index.vue'
import hospitalCard from '@/components/hospital-card/index.vue'
import {
  getHospitalLevelMapping,
  getHospitalList,
  getHospitalListByName,
  getHospitalRegionMapping
} from '@/api/request.ts'
import {onMounted, ref, watch} from "vue";
import {COMMON_DEPARTMENT, PAUSE_NOTICE, PLATFORM_NOTICE} from './constance.ts'
import {ArrowRight} from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'
import {HospitalDetail, HospitalType} from "@/views/home/type.ts";

const hosList = ref<Array<HospitalDetail>>([])
const levelList = ref<Array<HospitalType>>([]);
const regionList = ref<Array<HospitalType>>([]);
const hospitalList = ref<Array<HospitalDetail>>([]);
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0);
const hostype = ref('');
const districtCode = ref('');
const router = useRouter();

onMounted(async () => {
  await getHospitalLevel();
  await getHospitalRegion();
  await getHospitalsList();
})

async function handleInput(value: string) {
  const hosListRes = await getHospitalListByName(value)
  if (hosListRes.code === 200) {
    hosList.value = hosListRes.data;
  }
}


async function getHospitalLevel() {
  const levelRes = await getHospitalLevelMapping();
  if (levelRes.code === 200) {
    levelList.value = levelRes.data;
  }
}

async function getHospitalRegion() {
  const region = await getHospitalRegionMapping();
  if (region.code === 200) {
    regionList.value = region.data;
  }
}

async function handleSelect(type: string, id: string) {
  type === 'level' ? hostype.value = id : districtCode.value = id;
  await getHospitalsList(
      undefined,
      undefined,
      undefined,
      undefined,
      hostype.value,
      undefined,
      undefined,
      districtCode.value,
      undefined
  );
}

async function getHospitalsList(
    current?: number,
    size?: number,
    hoscode?: string,
    hosname?: string,
    hostype?: string,
    provinceCode?: string,
    cityCode?: string,
    districtCode?: string,
    status?: number
) {
  const hospitalListRes = await getHospitalList(
      current ? current : currentPage.value,
      size ? size : pageSize.value,
      {
        hoscode,
        hosname,
        hostype,
        provinceCode,
        cityCode,
        districtCode,
        status,
      }
  )
  if (hospitalListRes.code === 200) {
    hospitalList.value = hospitalListRes.data.content;
    total.value = hospitalListRes.data.totalElements;
  }
}

watch(
    [currentPage, pageSize],
    async ([newCurrent, newSize]) => {
      await getHospitalsList(newCurrent, newSize)
    }
)

function handleCurrentChange(current: number) {
  currentPage.value = current;
}

function handleSizeChange(size: number) {
  pageSize.value = size;
}

function toHospitalDetail(code: string) {
  router.push({
    path: '/hospital/register',
    query: {
      code: code
    }
  })
}
</script>

<style lang="scss" scoped>
.hospital-card {
  margin-top: 20px;
}

:deep(.el-row) {
  justify-content: space-between;
}

.common-department {
  font-size: 14px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;

    &__text {
      width: 50%;
      text-align: center;
      padding: 10px 0;
    }
  }
}

.platform-notice {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    padding: 20px 10px;

    &__wrapper {
      display: flex;
      align-items: center;
      padding: 10px 0;

      &__dot {
        min-width: 5px;
        min-height: 5px;
        border-radius: 50%;
        background: #7eabff;
      }

      &__text {
        margin-left: 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

  }
}

.pause-notice {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    padding: 20px 10px;

    &__wrapper {
      display: flex;
      align-items: center;
      padding: 10px 0;

      &__dot {
        min-width: 5px;
        min-height: 5px;
        border-radius: 50%;
        background: #ffaa51;
      }

      &__text {
        margin-left: 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>