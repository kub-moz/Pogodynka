<script setup lang="ts">
const emit = defineEmits(["clicked"])

const handleClick = () => {
    emit("clicked")
}
</script>

<template>
    <button @click="handleClick"
        class="p-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-500 hover:bg-orange-800 focus:outline-none w-12 h-12 flex items-center justify-center glow">
        <slot>

        </slot>
    </button>
</template>

<style scoped>
.glow:hover {
    box-shadow: 0 0 8px 2px rgba(255, 165, 0, 0.7); /* Adjust color and size as needed */
}
</style>