<script setup lang="ts">
import { computed, ref } from "vue";
import SearchBox from "./components/SearchBox.vue"
import But from "./components/But.vue";
import View from "./components/View.vue";
import Panel from "./components/Panel.vue";
import Skeleton from "./components/Skeleton.vue";
import { WeatherRequest, Forecast } from "./modules/interfaces";
import { GetWeather, GetForecast, Sleep } from "./modules/DataFetch"
import waveBG from './assets/waveBG.svg'
import CountryFlag from 'vue-country-flag-next'

const isCelcius = ref(true);
const loading = ref(false);
const errorText = ref("");
const WData = ref<WeatherRequest | undefined>()
const FData = ref<Forecast | undefined>()
let Drill: any = undefined

function PlugDrill(a: any) {
  Drill = a
}

function switchCelcius() {
  isCelcius.value = !isCelcius.value
}

const waveBGClass = ref('opacity-10');

async function SearchCity(cityName: string) {
  WData.value = undefined;
  FData.value = undefined;
  
  loading.value = true;
  await Sleep(1);
  waveBGClass.value = 'opacity-30';
  const DataPromise = GetWeather(cityName);
  let getData: WeatherRequest | undefined = undefined;
  
  DataPromise.then((data) => { getData = data })
    .catch((err) => { errorText.value = err.message })
    .finally(() => {
      loading.value = false
      if (getData) {
        WData.value = getData;
        errorText.value = "";
        waveBGClass.value = 'opacity-80';
      } else {
        WData.value = undefined
        errorText.value = "Nie znaleziono wyników dla tego miejsca"
        waveBGClass.value = 'opacity-10';
      }

      if (Drill) {
        Drill()
      }
    })

    FData.value = undefined
    GetForecast(cityName).then(data => FData.value = data)
    
}
</script>

<style scoped>
.bgWave {
  transition: opacity 0.5s ease-in-out;
}
</style>

<template>
  <div class="space flex justify-between bg-neutral-900 shadow-md p-3 px-8 h-20 align-middle fixed w-full">
    <div class="flex items-center justify-center text-right align-middle text-white">
      <strong class="m-2 w-36">{{ WData?.name }}</strong>
      <div>
        <CountryFlag v-if="WData" :country="WData?.sys.country" size="normal" />
      </div>
    </div>

    <SearchBox v-on:searched="SearchCity" />
    <div>
      <But v-on:clicked="switchCelcius">
        {{ isCelcius ? "C" : "F" }}°
      </But>
    </div>
  </div>



  <div class="pt-24">
    <div class="w-3/5 h-4/5 flex align-middle justify-center mx-auto">
      <div style="width: 64rem;">
        <View v-model:IsCelcius="isCelcius" :f="FData" :w="WData" v-if="WData && errorText == ''" v-on:plugger="PlugDrill">

        </View>
        <div v-else-if="loading == true" class="grid grid-cols-2 grid-rows-2 gap-5">
          <Panel header="Loading..." opacity="loading" v-for="x in [1,2,3,4]">
            <Skeleton />
          </Panel>
        </div>
        <div v-else>
          <p class="text-red-500">{{ errorText }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full">
    <img :src="waveBG" :class="waveBGClass" class="bgWave w-full fixed bottom-[-1rem] -z-10">
  </div>
</template>