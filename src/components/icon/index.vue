<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :href="icon"></use>
  </svg>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: ''
  }
})

const icon = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
</style>