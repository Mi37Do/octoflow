<template>
    <span class="font-medium capitalize text-xs text-[var(--btn-float)]">{{ elements }} elements</span>
</template>

<script setup>
const props = defineProps(['elements'])
</script>

<style lang="scss" scoped></style>