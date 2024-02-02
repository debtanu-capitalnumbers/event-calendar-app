<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="export_type" class="control-label">Export Type</span>
        <select ref="export_type" class="form-select border-0 border-bottom border-radius-0" :class="{ 'is-invalid': props.errors.export_type && props.errors.export_type[0] }" aria-label="Default select example" name="export_type" id="export_type" v-model="props.form.export_type">
            <option value="csv">CSV</option>
            <option value="ics">ICS</option>
        </select>
        <div class="invalid-feedback" v-if="props.errors.export_type && props.errors.export_type[0]">
            {{ props.errors.export_type && props.errors.export_type[0] }}
        </div>
    </div>
</template>
<style>
</style>
<script setup>
    const props = defineProps({
        form: Object,
        errors: Object,
    })   
</script>