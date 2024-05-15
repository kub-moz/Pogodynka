<template>
  <div class="wind-direction" :style="windStyle" v-if="deg">
    <img :src="arrow" class="wind-arrow" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import arrow from '../assets/arrow.svg';

const props = defineProps({
  deg: Number,
});

const windStyle = computed(() => ({
  transform: `rotate(${(props.deg || 0) + 180}deg)`,
}));
</script>

<style scoped>
.wind-direction {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-right: 0.2rem;
}

.wind-arrow {
  width: 32px;
  transition: transform 0.3s ease-in-out;
}
</style>