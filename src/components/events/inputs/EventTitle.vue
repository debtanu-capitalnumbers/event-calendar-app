<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="title" class="control-label">Title</span>
        <input ref="title" type="text" v-model="props.form.title" @keyup="validateData('title')" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': props.errors.title && props.errors.title[0] }" id="title" name="title" placeholder="Title"  maxlength="100" />
        
        <div class="col-md-12">
            <span class="float-end">{{titleLengthCount}}/100</span>
        </div>
        <div class="invalid-feedback" v-if="props.errors.title && props.errors.title[0]">
            {{ props.errors.title && props.errors.title[0] }}
        </div>
    </div>
</template>
<style>
</style>
<script setup>
    import { computed } from "vue";
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })

    const titleLengthCount = computed(
        () => (props.form.title !== null) ? props.form.title.length : 0
    )    

    const validateData = (value) => {
        emit("doingValidation", value)
    }
</script>