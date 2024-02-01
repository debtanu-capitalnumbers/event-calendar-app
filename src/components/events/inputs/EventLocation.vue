<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="location" class="control-label">Location</span>
        <input ref="location" type="text" v-model="props.form.location" @keyup="validateData('location')" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': props.errors.location && props.errors.location[0] }" id="location" name="location" placeholder="location"  maxlength="100" />
        
        <div class="col-md-12">
            <span class="float-end">{{locationLengthCount}}/100</span>
        </div>
        <div class="invalid-feedback" v-if="props.errors.location && props.errors.location[0]">
            {{ props.errors.location && props.errors.location[0] }}
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
          
    const locationLengthCount = computed(
        () => (props.form.location !== null) ? props.form.location.length : 0
    )   

    const validateData = (value) => {
        emit("doingValidation", value)
    }
</script>