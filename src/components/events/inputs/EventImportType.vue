<template>   
    <div class="row p-3 col-md-10 form-group required">
        <span for="import_type" class="control-label">Import Type</span>
        <select ref="import_type" class="form-select border-0 border-bottom border-radius-0" :class="{ 'is-invalid': props.errors.import_type && props.errors.import_type[0] }" aria-label="Default select example" name="import_type" id="import_type" v-model="props.form.import_type">
            <option value="csv">CSV</option>
            <option value="ics">ICS</option>
        </select>
        <div class="invalid-feedback" v-if="props.errors.import_type && props.errors.import_type[0]">
            {{ props.errors.import_type && props.errors.import_type[0] }}
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