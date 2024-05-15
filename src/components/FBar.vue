<script setup lang='ts'>
import { computed, ref } from 'vue';
import { tempWrap } from '../modules/TempUtil';

const props = defineProps({
    temp: Number,
    mainTemp: Number,
    isCelcius: Boolean,
    date: String
});

const strokeStyle = ref("");

const days = props.date?.split(" ")[0].split("-");
let daysComp = ""

if (days) {
    daysComp = `${days[1]}.${days[2]}`
}

const diff = computed(() => {
    const difference = (props.temp || 0) - (props.mainTemp || 0);
    return difference * 4;
});

const barStyle = computed(() => {
    const baseStyle = 'h-8 absolute bottom-1/2 transform top-0 absolute';
    const length = Math.abs(diff.value);
    if (diff.value > 0) {
        strokeStyle.value = 'AddStroke'
        return `${baseStyle} bg-green-500 left-1/2`;
    } else {
        strokeStyle.value = 'SubStroke'
        return `${baseStyle} bg-red-500 right-1/2`;
    }
});

</script>

<template>
    <div class="relative text-center p-4 h-8">
        <div :class="barStyle" :style="{width: Math.min(Math.abs(diff), 55) + '%'}"></div>
        <span :class="strokeStyle" class="font-black absolute z-10 w-full text-center bottom-0 right-0">{{ tempWrap(temp, isCelcius) }}</span>
        <span class="absolute z-10 w-full text-left bottom-0 right-0 text-xs"> {{daysComp}} </span>
    </div>
</template>