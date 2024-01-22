<template>
  <div class="register-container">
    <div class="wrapper">
      <div class="header">
        <div class="header-name">
          {{ hospitalInfo.hospital?.hosname }}
        </div>
        <div class="header-level">
          {{ hospitalInfo.hospital?.param.hostypeString }}
        </div>
      </div>
      <div class="content">
        <div class="introduction">
          <div class="hospital-icon">
            <img :src="`data: image/jpeg; base64, ${hospitalInfo.hospital?.logoData}`" alt="">
          </div>
          <div class="hospital-text">
            <div style="font-size: 16px;margin: 10px 0;color: #333333">挂号规则</div>
            <div>
              预约周期：{{ hospitalInfo.bookingRule?.cycle }} 天,
              放号时间：{{ hospitalInfo.bookingRule?.releaseTime }},
              停挂时间：{{ hospitalInfo.bookingRule?.quitTime }}
            </div>
            <div>具体地址：{{ hospitalInfo.hospital?.param.fullAddress }}</div>
            <div>规划路线：{{ hospitalInfo.hospital?.route }}</div>
            <div>退号时间：就诊前一工作日{{ hospitalInfo.bookingRule?.stopTime }}前取消</div>
            <div style="font-size: 16px;margin: 10px 0; color: #333333">医院预约规则</div>
            <div v-for="(item,index) in hospitalInfo.bookingRule?.rule">
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {getHospitalDetail} from "@/api/request.ts";
import {onMounted, ref} from "vue";
import {HospitalDetail} from "@/type";


const hospitalInfo = ref(<HospitalDetail>{})

onMounted(async () => {
  await getHospitalInfo()
})

async function getHospitalInfo() {
  const hosInfo = await getHospitalDetail(<string>useRoute().query.code);
  if (hosInfo.code === 200) {
    hospitalInfo.value = hosInfo.data;
  }
}

</script>

<style lang="scss" scoped>
.register-container {
  .wrapper {
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
    }
  }
}
</style>