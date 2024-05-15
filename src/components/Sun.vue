<script setup lang="ts">
import Sun from "./../assets/sun.svg"
import Cloud from "./../assets/cloud.svg"
import Rain from "./../assets/rain.svg"
import Snowflake from "./../assets/snowflake.svg"
import { computed, ref, watch } from "vue";

const Mapped: { [i: string]: any } = {
    Sun: Sun,
    Clouds: Cloud,
    Rain: Rain,
    Snowflake: Snowflake,
}

const props = defineProps({
    Icon: String,
    Temp: Number,
});

let SetIcon = ref(props.Icon);

function ProcessIcon() {
    SetIcon.value = props.Icon;
    if (props.Icon == "Clear" && props.Temp) {
        if (props.Temp > 0) {
            SetIcon.value = "Sun"
        } else {
            SetIcon.value = "Snowflake"
        }
    }
    
}

watch(() => props.Icon, ProcessIcon)
watch(() => props.Temp, ProcessIcon)

ProcessIcon()

</script>

<template>
    <img v-if="SetIcon" :src="Mapped[SetIcon]" class="h-14 float-left mr-2" />
</template>