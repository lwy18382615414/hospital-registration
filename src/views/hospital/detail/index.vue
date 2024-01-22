<template>
  <div class="detail-container">
    <div class="header">
      <div class="header-name">
        {{ hospitalInfo.hospital.hosname }}
      </div>
      <div class="header-level">
        {{ hospitalInfo.hospital.param?.hostypeString }}
      </div>
    </div>
    <div class="content">
      <div class="introduction">
        <div class="hospital-icon">
          <img :src="`data: image/jpeg; base64, ${hospitalInfo.hospital.logoData}`" alt="">
        </div>
        <div class="hospital-text">
          <div>具体地址：{{ hospitalInfo.hospital.param?.fullAddress }}</div>
          <div>规划路线：{{ hospitalInfo.hospital.route }}</div>
        </div>
      </div>
      <div class="detail">
        <div class="detail-header">医院介绍</div>
        <p>{{ hospitalInfo.hospital.intro }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {getHospitalDetail} from "@/api/request.ts";
import {onMounted, ref} from "vue";
import {HospitalDetail} from "@/type";

const route = useRoute();
const hospitalInfo = ref(<HospitalDetail>{
  bookingRule: {},
  hospital: {},
})

onMounted(async () => {
  await getHospitalInfo();
})

async function getHospitalInfo() {
  const hospitalRes = await getHospitalDetail(<string>route.query.code)
  if (hospitalRes.code === 200) {
    hospitalInfo.value = hospitalRes.data
  }
}

</script>

<style lang="scss" scoped>
.detail-container {
  .header {
    display: flex;
    align-items: flex-end;

    .header-name {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .header-level {
      margin-left: 10px;
      color: #999;
    }
  }

  .content {
    .introduction {
      display: flex;
      margin: 20px 0;

      .hospital-icon {
        img {
          width: 100px;
          height: 100px;
        }
      }

      .hospital-text {
        div {
          padding: 3px 0;
          color: #666666;
        }
      }
    }

    .detail {
      .detail-header {
        font-weight: 600;
        font-size: 16px;
        padding: 10px 0;
      }

      p {
        line-height: 2;
      }
    }
  }
}
</style>