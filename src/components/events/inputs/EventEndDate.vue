<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="event_end_date" class="control-label">End Date</span>
        <VueDatePicker ref="event_end_date" v-model="props.form.event_end_date" @blur="validateData('event_end_date')" :class="{ 'is-invalid': props.errors.event_end_date && props.errors.event_end_date[0] }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_end_date" name="event_end_date"></VueDatePicker>
        <div class="invalid-feedback" v-if="props.errors.event_end_date && props.errors.event_end_date[0]">
            {{ props.errors.event_end_date && props.errors.event_end_date[0] }}
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