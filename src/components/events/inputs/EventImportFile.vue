<template> 
    <div class="row p-3 col-md-10 form-group">
        <span for="import_file" class="control-label">Import File</span>
        <div class="custom-file">
            <input ref="import_file" type="file" class="custom-file-input" name="import_file" id="import_file" @change="$event => updatePhoto($event.target.files)">
            <span class="custom-file-label border-0 border-bottom form-control" for="import_file" :class="{ 'is-invalid': props.errors.import_file && props.errors.import_file[0] }">{{ computedinputFileLabel }}</span>
        </div>

        <div class="col-md-12">
            <span class="float-start image_info">Maximum upload image size 4MB. Only support ICS/CSV format.</span>
        </div>
        <div class="invalid-feedback" v-if="props.errors.import_file && props.errors.import_file[0]">
            {{ props.errors.import_file && props.errors.import_file[0] }}
        </div>
    </div> 
</template>
<style>
</style>
<script setup>
    import { computed } from "vue";
    import { doUpdateImportFile } from '../../../helper/EventHelper.js'  
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    }) 
    
    const computedinputFileLabel = computed(
        () => (props.form.import_file !== null) ? props.form.import_file.name : "Choose file"
    )

    const updatePhoto  = (files) => {
        doUpdateImportFile(files, props.form)
    } 
</script>