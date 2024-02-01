<template>   
    <div class="row p-3 col-md-10 form-group">
        <span for="cover_image" class="control-label">Cover Image</span>
        <div class="custom-file">
            <input ref="cover_image" type="file" class="custom-file-input" name="cover_image" id="cover_image" @change="$event => updatePhoto($event.target.files)">
            <span class="custom-file-label border-0 border-bottom form-control" for="cover_image" :class="{ 'is-invalid': props.errors.cover_image && props.errors.cover_image[0] }">{{ computedinputFileLabel }}</span>
        </div>
        
        <div class="col-md-12">
            <span class="float-start image_info">Maximum upload image size 4MB. Only support JPG/JPEG/PNG format.</span>
        </div>
        <div class="mb-1 d-flex justify-content-left p-0">
            <img :src="imageUrl" alt="example placeholder" :style="{ 'max-width':'150px', 'max-height':'150px'}"/>
        </div>
        <div class="invalid-feedback" v-if="props.errors.cover_image && props.errors.cover_image[0]">
            {{ props.errors.cover_image && props.errors.cover_image[0] }}
        </div>
    </div>
</template>
<style>
</style>
<script setup>
    import { ref, computed } from "vue";
    import { doUpdatePhoto } from '../../../helper/EventHelper.js'  
    import imagedefaultUrl from '../../../assets/image-placeholder.png';
    const imageData = ref(null)
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })   
     
    const computedinputFileLabel = computed(
        () => (props.form.cover_image !== null) ? props.form.cover_image.name : "Choose file"
    )
    const imageUrl = computed(
        () => (imageData.value !== null) ? imageData.value : imagedefaultUrl
    )

    const updatePhoto  = (files) => {
        doUpdatePhoto(files, props.form, imageData)
    } 
</script>