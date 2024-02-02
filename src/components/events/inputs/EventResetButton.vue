<template>   
    <button class="w-10 btn btn-secondary m-1"  @click.prevent="resetForm">back</button>
</template>
<style>
</style>
<script setup>
    const emit = defineEmits(['doingResetForm'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })   

    const resetForm = (value) => {
        emit("doingResetForm", value)
    }
</script>