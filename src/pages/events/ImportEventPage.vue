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
    import { onMounted, reactive, computed, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import { notify } from "@kyvg/vue3-notification";
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers } from '@vuelidate/validators';

    const store = useEventStore()
    const { handleImportEvent } = store
    const { errors, status, isShowLoader, isSuccess } = storeToRefs(store)

    const router = useRouter()
    const imageData = ref(null)
    
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
    const rules = computed(() => { 
        return {
            import_type: { required: helpers.withMessage('Event Import type is required', required) },
            import_file: { required: helpers.withMessage('Event import file is required', required) },
        };      
    });
    const v$ = useVuelidate(rules, form);

    const computedinputFileLabel = computed(
        () => (form.import_file !== null) ? form.import_file.name : "Choose file"
    )
    
    const updatePhoto = (files) => {
        console.log('here')
        if (!files.length) {
            imageData.value = form.import_file = null
            return
        } {
            const size = files[0].size
            const type = files[0].type
            
            if(type !== "text/calendar" && type !== "text/csv"){
                errors.value.import_file = ["Only support JPG/JPEG/PNG format."]
                return
            }
            if(size > (1024*1024*4)){
                errors.value.import_file = ["Maximum upload file size 4MB."]
                return
            }
            
            // Store the file data
            form.import_file = {
                name: files[0].name,
                data: files[0]
            };            
        }
    }
    
    const validateData = async (field) => {
        errors.value = {};
        let errorCount = 0;
        let notifyError = '';
        let result = true;
        if(field !== 'value'){
            result = await v$.value[field].$validate();
        } else {
            result = await v$.value.$validate();
        }
        v$.value.$errors.forEach((element, index) => {
            if(index == 0){
                notifyError = element.$message;
            }
            errors.value[element.$property] = [element.$message];
            errorCount++;
        });
        
        if(errorCount >= 2){
            notifyError += ' (and ' + (-- errorCount) + ' more errors)';
        }
        if(notifyError !== ""){
            notify({
                title: notifyError,
                type: 'error',
            });
        }
        return result;
    }

    const resetForm = () => {
        // Object.assign(form, initialState);
        router.push({ name: 'events' });
    }

    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){  
            let formData = new FormData();
            formData.append('import_type', form.import_type);
            if(form.import_file.data && form.import_file.name) { formData.append('import_file', form.import_file.data, form.import_file.name); }
            await handleImportEvent(formData)        
            if(errors.value.common) {
                notify({
                    title: errors.value.common,
                    type: (isSuccess.value) ? 'success' : 'error',
                });
            }
        }
    }
</script>