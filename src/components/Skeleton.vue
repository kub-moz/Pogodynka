<script setup lang="ts">
const colors = ['bg-neutral-500', 'bg-neutral-700', 'bg-orange-500', 'bg-red-800', 'bg-transparent'];

function randomizeColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
</script>

<template>
    <div  class="space-y-2.5 animate-pulse max-w-lg">
        <div class="flex items-center w-full">
            <div :class="randomizeColor()" class="h-2.5 rounded-full w-32"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-24"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-full"></div>
        </div>
        <div class="flex items-center w-full max-w-[480px]">
            <div :class="randomizeColor()" class="h-2.5 rounded-full w-full"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-full"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-24"></div>
        </div>
        <br>
        <div class="flex items-center w-full max-w-[400px]">
            <div :class="randomizeColor()" class="h-2.5 rounded-full w-full"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-80"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-full"></div>
        </div>
        <div class="flex items-center w-full max-w-[480px]">
            <div :class="randomizeColor()" class="h-2.5 rounded-full w-full"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-full"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-24"></div>
        </div>
        <br>
        <div class="flex items-center w-full max-w-[480px] h-3">
            <div :class="randomizeColor()" class="h-2.5 rounded-full w-32"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-24"></div>
            <div :class="randomizeColor()" class="h-2.5 ms-2 rounded-full w-52"></div>
        </div>
    </div>
</template>