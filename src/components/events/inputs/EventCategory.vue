<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="event_category" class="control-label">Event Category</span>
        <select ref="event_category" class="form-select border-0 border-bottom border-radius-0" @keyup="validateData('event_category')" :class="{ 'is-invalid': props.errors.event_category && props.errors.event_category[0] }" aria-label="Default select example" name="event_category" id="event_category" v-model="props.form.event_category">
            <option value="Library/Books">Library/Books</option>
            <option value="Community Engagement">Community Engagement</option>
        </select>
        <div class="invalid-feedback" v-if="props.errors.event_category && props.errors.event_category[0]">
            {{ props.errors.event_category && props.errors.event_category[0] }}
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

    const validateData = (value) => {
        emit("doingValidation", value)
    }
</script>