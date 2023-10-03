<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Export Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">
                <div class="row p-3 col-md-10 form-group required">
                    <span for="export_type" class="control-label">Export Type</span>
                    <select ref="export_type" class="form-select border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.export_type && errors.export_type[0] }" aria-label="Default select example" name="export_type" id="export_type" v-model="form.export_type">
                        <option value="csv">CSV</option>
                        <option value="ics">ICS</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.export_type && errors.export_type[0]">
                        {{ errors.export_type && errors.export_type[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_start_date" class="control-label">Start Date</span>
                    <VueDatePicker ref="event_start_date" v-model="form.event_start_date" :class="{ 'is-invalid': errors.event_start_date && errors.event_start_date[0] }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_start_date" name="event_start_date"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_start_date && errors.event_start_date[0]">
                        {{ errors.event_start_date && errors.event_start_date[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_end_date" class="control-label">Start Date</span>
                    <VueDatePicker ref="event_end_date" v-model="form.event_end_date" :class="{ 'is-invalid': errors.event_end_date && errors.event_end_date[0] }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_end_date" name="event_end_date"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_end_date && errors.event_end_date[0]">
                        {{ errors.event_end_date && errors.event_end_date[0] }}
                    </div>
                </div>
                <button class="w-10 btn btn-warning m-1" type="submit">Submit</button>
                <button class="w-10 btn btn-secondary m-1"  @click.prevent="resetForm">back</button>
            </form>
        </div>
    </div>
</template>
<style>
    .form-group.required .control-label:after {
        content:"*";
        color:red;
    }
    .border-radius-0 {
        border-radius: 0px;
    }
    .form-control.is-invalid, .was-validated .form-control:invalid, .form-select.is-invalid, .was-validated .form-select:invalid, .form-control.is-invalid input, .was-validated .form-control:invalid input {
        border-color: #dc3545 !important;
    }
</style>
<script setup>
    import { onMounted, reactive, computed, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import moment from 'moment';
    import { notify } from "@kyvg/vue3-notification";
    import VueDatePicker from '@vuepic/vue-datepicker';

    const store = useEventStore()
    const { handleExportEvent } = store
    const { errors, status, isSuccess, isShowLoader, eventFile } = storeToRefs(store)

    const router = useRouter()
    const imageData = ref(null)
    
    const initialState = defineProps({
        export_type: {
            type: String,
            default: 'csv'
        },
        event_start_date: {
            type: String,
            default: ''
        },
        event_end_date: {
            type: String,
            default: ''
        }
    })
    
    onMounted(async () => {
        errors.value = {};
    })
    const form = reactive({ ... initialState });  
    
    const validateData = (form) => {
        errors.value = {};
        let errorCount = 0;
        let firstError = '';
        let notifyError = '';
        
        if(form.event_start_date === '' || form.event_start_date === null){
            errors.value.event_start_date = ["The event start date field is required."]
            if(firstError === "") {
                firstError = errors.value.event_start_date[0];
            }
            errorCount ++;
            // event_start_date.scrollIntoView({ behavior: 'smooth' });
        }
        if(form.event_end_date === '' || form.event_end_date === null){
            errors.value.event_end_date = ["The event end date field is required."]
            if(firstError === "") {
                firstError = errors.value.event_end_date[0];
            }
            errorCount ++;
            // event_start_date.scrollIntoView({ behavior: 'smooth' });
        }
        if(form.event_start_date !== '' && form.event_start_date !== null && form.event_end_date !== '' && form.event_end_date !== null) {            
            const event_start_date = moment(form.event_start_date);
            const event_end_date = moment(form.event_end_date);
            if(event_end_date <= event_start_date) {                
                errors.value.event_end_time = ["The event end date must be greater than start date."]
                if(firstError === "") {
                    firstError = errors.value.event_end_time[0];
                }
                errorCount ++;
            }
        }
        
        notifyError = firstError;
        if(errorCount >= 2){
            notifyError += ' (and ' + (-- errorCount) + ' more errors)';
        }
        if(notifyError !== ""){
            notify({
                title: notifyError,
                type: 'error',
            });
        }
        window.scrollTo(0,0);
        // export_type.scrollIntoView({ behavior: 'smooth' });
        return
    }

    const resetForm = () => {
        Object.assign(form, initialState);
        router.push({ name: 'events' });
    }

    const handleSubmit = async () => {
        const formValidation = validateData(form);
        if( JSON.stringify(errors.value) === '{}' ){  
            form.event_start_date = moment(form.event_start_date).format("YYYY-MM-DD")
            form.event_end_date = moment(form.event_end_date).format("YYYY-MM-DD")

            let formData = new FormData();
            formData.append('export_type', form.export_type);
            formData.append('event_start_date', form.event_start_date);
            formData.append('event_end_date', form.event_end_date);
            await handleExportEvent(formData)            
            if(errors.value.common) {
                notify({
                    title: errors.value.common,
                    type: (isSuccess) ? 'success' : 'error',
                });
            }
            window.location.href = eventFile.value;
        } else {
            return false;
        }
    }
</script>