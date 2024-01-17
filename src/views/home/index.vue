<template>
  <div>
    <carousel/>
    <search/>
    <el-row :gutter="20">
      <el-col :span="20">
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
          />
        </div>
      </el-col>
      <el-col :span="4">
        132
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import carousel from '@/components/carousel/index.vue'
import search from '@/components/search/index.vue'
import hospitalSearch from '@/components/hospital-search/index.vue'
import hospitalCard from '@/components/hospital-card/index.vue'

import {getHospitalLevelMapping, getHospitalList, getHospitalRegionMapping} from '@/api/request.ts'
import {onMounted, ref, watch} from "vue";

const levelList = ref([]);
const regionList = ref([]);
const hospitalList = ref([]);
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0);
const hostype = ref('');
const districtCode = ref('');

onMounted(async () => {
  await getHospitalLevel();
  await getHospitalRegion();
  await getHospitalsList();
})

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
</script>

<style lang="scss" scoped>
.hospital-card {
  margin-top: 20px;
}
</style>