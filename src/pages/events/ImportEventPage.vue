<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Import Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">
                <EventImportType :form="form" :errors="errors"/>              
                <EventImportFile :form="form" :errors="errors" @doingValidation="validateData"/>
                <EventSubmitButton />
                <EventResetButton  @doingResetForm="resetFormData"/>
            </form>
        </div>
    </div>
</template>
<style>
    .invalid-feedback {
        display: block;
    }
    .form-group.required .control-label:after {
        content:"*";
        color:red;
    }
    .image_info {
        color: #dee2e6;
    }
    .justify-content-center {
        justify-content: left!important;
    }
    .custom-file {
        position: relative;
        display: inline-block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        margin-bottom: 0;
    }
    .custom-file-input {
        position: relative;
        z-index: 2;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        margin: 0;
        overflow: hidden;
        opacity: 0;
    }
    .custom-file-label {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 0.375rem 1.4rem;
        overflow: hidden;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
    }
    .custom-file-label::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        display: block;
        padding: 0.375rem 0.75rem;
        color: #495057;
        background-color: #68e1c5;
        border-radius: 0 0.15rem 0.15rem 0;
        content: "Browse";
    }
    .border-radius-0 {
        border-radius: 0px;
    }
    .form-control.is-invalid, .was-validated .form-control:invalid, .form-select.is-invalid, .was-validated .form-select:invalid, .form-control.is-invalid input, .was-validated .form-control:invalid input {
        border-color: #dc3545 !important;
    }
    span.custom-file-label.border-0.border-bottom.form-control.is-invalid {
        background-size: calc(9.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
</style>
<script setup>
    import { onMounted, ref ,reactive } from "vue";
    import { storeToRefs } from "pinia";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import EventImportType from '../../components/events/inputs/EventImportType.vue';  
    import EventImportFile from '../../components/events/inputs/EventImportFile.vue';  
    import EventSubmitButton from '../../components/events/inputs/EventSubmitButton.vue';  
    import EventResetButton from '../../components/events/inputs/EventResetButton.vue'; 
    import { doResetFormData, doValidation, setupFormdData } from '../../helper/EventHelper.js'; 

    const store = useEventStore()
    const { handleImportEvent } = store
    const { isShowLoader } = storeToRefs(store)
    const errors = ref({})
    
    const initialState = defineProps({
        import_type: {
            type: String,
            default: 'csv'
        },
        import_file: {
            type: Object,
            default: {}
        },
    })
    
    onMounted(async () => {
        errors.value = {};
    })
    const form = reactive({ ... initialState });
    
    const validateData = async (field) => {
        const result = await doValidation(form, field, errors, 'import')
        return result;
    }

    const resetFormData = async () => {
        await doResetFormData(form, initialState)
    }

    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){  
            const formData = await setupFormdData(form, 'import')
            await handleImportEvent(formData) 
        }
    }
</script>