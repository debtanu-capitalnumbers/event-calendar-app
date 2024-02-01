<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="event_start_time" class="control-label">Start Time</span>
        <VueDatePicker ref="event_start_time" v-model="props.form.event_start_time" @keyup="validateData('event_start_time')" :class="{ 'is-invalid': props.errors.event_start_time && props.errors.event_start_time[0] }" time-picker :clearable="false" class="form-control border-0 p-0" id="event_start_time" name="event_start_time"></VueDatePicker>
        <div class="invalid-feedback" v-if="props.errors.event_start_time && props.errors.event_start_time[0]">
            {{ props.errors.event_start_time && props.errors.event_start_time[0] }}
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