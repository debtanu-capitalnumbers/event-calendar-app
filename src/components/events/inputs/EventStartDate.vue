<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="event_start_date" class="control-label">Start Date</span>
        <VueDatePicker ref="event_start_date" v-model="props.form.event_start_date" @blur="validateData('event_start_date')" :class="{ 'is-invalid': props.errors.event_start_date && props.errors.event_start_date[0] }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_start_date" name="event_start_date"></VueDatePicker>
        <div class="invalid-feedback" v-if="props.errors.event_start_date && props.errors.event_start_date[0]">
            {{ props.errors.event_start_date && props.errors.event_start_date[0] }}
        </div>
    </div>
</template>
<style>
</style>
<script setup>
    import VueDatePicker from '@vuepic/vue-datepicker';
    const emit = defineEmits(['doingValidation'])
    const props = defineProps({
        form: Object,
        errors: Object,
    })   

    const validateData = (value) => {
        emit("doingValidation", value)
    }
</script>