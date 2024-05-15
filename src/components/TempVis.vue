<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Sun from './Sun.vue';

const props = defineProps({
    Temp: Number
})

function Refresh() {
    const Amount = Math.min(Math.abs( Math.floor((props.Temp || 0) / 5) ), 4);

    let Out = []

    for (let i = 0; i < Amount; i++) {
        Out[i] = true;
    }

    return Out
}

const repeat = computed(Refresh)

console.log(repeat.value)

</script>

<template>
    <div v-if="Temp" class="grid grid-cols-2 grid-rows-2 w-12 h-16 justify-start items-stretch float-left">
        <Sun v-for="x in repeat" :Icon="Temp < 0 ? 'Snowflake' : 'Sun'" />
    </div>
</template>