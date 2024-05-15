<script setup lang="ts">
import { ref } from 'vue';
import But from './But.vue'

const emit = defineEmits(["searched"])
const inputValue = ref("")

function Search() {
    emit("searched", inputValue.value)
}
</script>

<template>
    <div class="flex items-center w-3/6">
        <div class="relative w-4/5">
            <input type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Wyszukaj miasto..."
                v-model="inputValue"j
                />
        </div>
        <div class="w-3"></div>
        <But v-on:clicked = "Search()">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </But>
    </div>
</template>