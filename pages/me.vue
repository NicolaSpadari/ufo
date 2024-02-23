<template>
    <div>
        <p>me:</p>

        <div>
            <pre>data:{{ data }}</pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { data } = await useFetch("/api/reddit");
</script>

<style scoped>
	.tkn{
		max-width: 12rem;
		overflow-x: scroll;
	}
</style>
