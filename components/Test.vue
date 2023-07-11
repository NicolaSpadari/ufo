<template>
    <div text-center space-y-5>
        {{ test }}
        <UIcon name="i-heroicons-light-bulb" />
    </div>
</template>

<script lang="ts" setup>
    const { test } = useTest();
</script>
