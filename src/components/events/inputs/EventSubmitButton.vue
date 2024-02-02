<template>   
    <button class="w-10 btn btn-warning m-1" type="submit">Submit</button>
</template>
<style>
</style>
<script setup>
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })   

    const validateData = (value) => {
        emit("doingValidation", value)
    }
</script>