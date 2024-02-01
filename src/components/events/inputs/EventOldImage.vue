<template>   
    <div class="row p-3 col-md-10">
        <img :src="oldImageUrl" alt="{{ props.form.title }}" :style="{ 'max-width':'150px', 'max-height':'150px'}"/>
    </div>
</template>
<style>
</style>
<script setup>
    import { computed } from "vue";
    import imagedefaultUrl from '../../../assets/image-placeholder.png';
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })

    const oldImageUrl = computed(
        () => (props.form.download_path !== null && props.form.download_path !== "") ? props.form.download_path : imagedefaultUrl
    )  
</script>