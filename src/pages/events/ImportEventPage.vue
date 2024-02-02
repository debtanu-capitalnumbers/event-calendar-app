<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Import Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">
                <div class="row p-3 col-md-10 form-group required">
                    <span for="import_type" class="control-label">Import Type</span>
                    <select ref="import_type" class="form-select border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.import_type && errors.import_type[0] }" aria-label="Default select example" name="import_type" id="import_type" v-model="form.import_type">
                        <option value="csv">CSV</option>
                        <option value="ics">ICS</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.import_type && errors.import_type[0]">
                        {{ errors.import_type && errors.import_type[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group">
                    <span for="import_file" class="control-label">Import File</span>
                    <div class="custom-file">
                        <input ref="import_file" type="file" class="custom-file-input" name="import_file" id="import_file" @change="$event => updatePhoto($event.target.files)">
                        <span class="custom-file-label border-0 border-bottom form-control" for="import_file" :class="{ 'is-invalid': errors.import_file && errors.import_file[0] }">{{ computedinputFileLabel }}</span>
                    </div>

                    <div class="col-md-12">
                        <span class="float-start image_info">Maximum upload image size 4MB. Only support ICS/CSV format.</span>
                    </div>
                    <div class="invalid-feedback" v-if="errors.import_file && errors.import_file[0]">
                        {{ errors.import_file && errors.import_file[0] }}
                    </div>
                </div>                
                <button class="w-10 btn btn-warning m-1" type="submit">Submit</button>
                <button class="w-10 btn btn-secondary m-1"  @click.prevent="resetForm">back</button>
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
    import { onMounted, ref ,reactive, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import { doValidation, doUpdateExportFile, setupFormdData } from '../../helper/EventHelper.js'; 

    const store = useEventStore()
    const { handleImportEvent } = store
    const { isShowLoader } = storeToRefs(store)
    const errors = ref({})
    const router = useRouter()
    
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
    
    const computedinputFileLabel = computed(
        () => (form.import_file !== null) ? form.import_file.name : "Choose file"
    )

    const updatePhoto  = (files) => {
        doUpdateExportFile(files, props.form)
    } 
    
    const validateData = async (field) => {
        const result = await doValidation(form, field, errors, 'import')
        return result;
    }

    const resetForm = () => {
        // Object.assign(form, initialState);
        router.push({ name: 'events' });
    }

    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){  
            const formData = await setupFormdData(form, 'import')
            await handleImportEvent(formData) 
        }
    }
</script>