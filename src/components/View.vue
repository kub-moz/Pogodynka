<script setup lang="ts">
import { PropType, ref, watch, defineEmits } from 'vue';
import { Forecast, WeatherRequest } from '../modules/interfaces';
import { tempWrap } from '../modules/TempUtil';
import Separator from './Separator.vue';
import Panel from './Panel.vue';
import Sun from './Sun.vue';
import WindArrow from './WindArrow.vue'
import FBar from './FBar.vue';
import { TimeStampToHour, getCurrentTimeWithOffset, timestampToFullDateTime } from '../modules/TempUtil';

import wind from '../assets/wind.svg';
import clock from '../assets/clock.svg';
import sunrise from '../assets/sunrise.svg';
import sunset from '../assets/sunset.svg';

const props = defineProps({
    IsCelcius: Boolean,
    w: Object as PropType<WeatherRequest>,
    f: Object as PropType<Forecast>,
})

const bgClass = ref("")
const emit = defineEmits(["plugger"])

const BgMap: {[index: string]: string} = {
    Clouds: "bg-gray-400",
    Rain: "bg-blue-500"
}

const Updater = () => {
    const w = props.w
    const WeatherType = w?.weather[0]?.main

    if (WeatherType) {
        bgClass.value = BgMap[WeatherType] || ""
    } else {
        bgClass.value = ""
    }
}

emit("plugger", Updater)
Updater()

</script>

<template>
    <div>
        <div class="grid grid-cols-2 grid-rows-2 gap-5">
            <Panel header="Glowne Informacje">
                <div class="flex items-stretch gap-1">
                    <Sun :Icon="w?.weather[0].main" :Temp="w?.main.temp" />
                    <div class="size-mwatch(() => props.Icon, ProcessIcon)ax">
                        <p class="text-5xl">
                            {{ tempWrap(w?.main.temp, props.IsCelcius) }}
                        </p>
                        <p class="text-sm">
                            {{ tempWrap(w?.main.feels_like, props.IsCelcius) }} Odczuwalna
                        </p>
                    </div>
                </div>

                <Separator />

                <p class="ml-1">
                    {{ w?.weather[0].description }}
                </p>
            </Panel>

            <Panel header="Wiatr">
                <div class="flex justify-start gap-2">
                    <img :src="wind" class="h-14" />
                    <div>
                        <p class="text-3xl">
                            {{ w?.wind.speed }} m/s
                        </p>
                        <p class="text-lg">
                            <WindArrow :deg="w?.wind.deg" />
                            {{ w?.wind.deg }}° 
                        </p>
                    </div>
                </div>
            </Panel>

            <Panel header="Czas">
                <div class="flex justify-around align-middle">
                    <img class="h-8" :src="clock">
                    <p>Teraz:</p>
                    <strong> {{ getCurrentTimeWithOffset(w?.timezone) }} </strong>
                </div>
                <Separator />
                <div class="flex justify-around align-middle">
                    <img class="h-8" :src="sunset">
                    <p>Wschod:</p>
                    <strong> {{ TimeStampToHour(w?.sys.sunrise) }} </strong>
                </div>
                <Separator />
                <div class="flex justify-around align-middle">
                    <img class="h-8" :src="sunrise">
                    <p>Zachod:</p>
                    <strong> {{ TimeStampToHour(w?.sys.sunset) }} </strong>
                </div>
            </Panel>

            <Panel header="Prognoza" v-if="f">
                <FBar v-for="v in [f.list[1], f.list[5], f.list[10], f.list[15]]" :date=" v.dt_txt " :temp="v.main.temp" :mainTemp="w?.main.temp"  :isCelcius="IsCelcius" />
            </Panel>
        </div>
        
        <p class="absolute right-0 bottom-0 text-neutral-400">
            {{ timestampToFullDateTime(w?.dt) }}
        </p>

        <div :class="bgClass"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-20 transition-colors duration-700 opacity-20">
        </div>
    </div>
</template>