<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="description" class="control-label">Description</span>                    
        <vue-editor ref="description" v-model="props.form.description" @keyup="validateData('description')" class="form-control border-0" id="description" name="description" placeholder="Description" :class="{ 'is-invalid': props.errors.description && props.errors.description[0] }"></vue-editor>
        <div class="invalid-feedback" v-if="props.errors.description && props.errors.description[0]">
            {{ props.errors.description && props.errors.description[0] }}
        </div>
    </div>
</template>
<style>
</style>
<script setup>
    import { VueEditor } from "vue3-editor";
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })   

    const validateData = (value) => {
        emit("doingValidation", value)
    }
</script>