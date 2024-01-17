<template>
  <div class="hospital-search-container">
    <div class="level-container">
      <div class="hos-level">
        <div class="hos-level__title">等级：</div>
        <div class="hos-level__content">
          <span :class="levelIndex === index ? 'active' : ' '"
                v-for="(level, index) in extendedLevelList"
                :key="level.id"
                @click="handleSelect(index, 'level', level.value)"
          >
            {{ level.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="region-container">
      <div class="content">
        <div class="left">地区：</div>
        <div class="hos-region">
          <div :class="regionIndex === index ? 'active' : ' '"
               v-for="(region, index) in extendedRegionList"
               :key="region.id"
               @click="handleSelect(index, 'region', region.value)"
          >
            {{ region.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {HospitalType} from "@/components/hospital-search/type.ts";
import {computed, PropType, ref} from "vue";

const emit = defineEmits(["handleSelect"])

const props = defineProps({
  levelList: {
    type: Array as PropType<Array<HospitalType>>,
    default: () => [],
  },
  regionList: {
    type: Array as PropType<Array<HospitalType>>,
    default: () => [],
  }
})

const levelIndex = ref<number>(0);
const regionIndex = ref<number>(0);

const extendedLevelList = computed(() => {
  return [{id: 'all', name: '全部', value: undefined}, ...props.levelList];
});

const extendedRegionList = computed(() => {
  return [{id: 'all', name: '全部', value: undefined}, ...props.regionList];
});

function handleSelect(i: number, type: string, id: string | undefined) {
  if (type === 'level') {
    levelIndex.value = i;
    emit("handleSelect", type, id)
  } else {
    regionIndex.value = i;
    emit("handleSelect", type, id)
  }
}

</script>

<style lang="scss" scoped>
.hospital-search-container {
  color: #7f7f7f;
  margin-top: 50px;

  .level-container {

    .hos-level {
      display: flex;
      margin-top: 10px;

      &__content {
        > span {
          margin-right: 15px;

          &.active {
            color: #55a6fe;
          }
        }

        > span:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }

  .region-container {
    margin-top: 10px;

    .content {
      display: flex;

      .left {
        white-space: nowrap;
      }

      .hos-region {
        display: flex;
        flex-wrap: wrap;

        > div {
          &.active {
            color: #55a6fe;
          }

          margin: 0 10px 8px 0;
        }

        > div:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }
}

</style>