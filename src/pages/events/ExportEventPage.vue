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
                    <VueDatePicker ref="event_start_date" v-model="form.event_start_date" @blur="validateData('event_start_date')" :class="{ 'is-invalid': errors.event_start_date && errors.event_start_date[0] }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_start_date" name="event_start_date"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_start_date && errors.event_start_date[0]">
                        {{ errors.event_start_date && errors.event_start_date[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_end_date" class="control-label">Start Date</span>
                    <VueDatePicker ref="event_end_date" v-model="form.event_end_date" @blur="validateData('event_end_date')" :class="{ 'is-invalid': errors.event_end_date && errors.event_end_date[0] }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_end_date" name="event_end_date"></VueDatePicker>
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
    import { onMounted, ref ,reactive } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import { doValidation, setupFormdData } from '../../helper/EventHelper.js';   

    const store = useEventStore()
    const { handleExportEvent } = store
    const { status, isSuccess, isShowLoader, eventFile } = storeToRefs(store)
    const errors = ref({})
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
    
    const resetForm = () => {
        Object.assign(form, initialState);
        router.push({ name: 'events' });
    }    
    
    const validateData = async (field) => {
        const result = await doValidation(form, field, errors, 'export')
        return result;
    }

    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){  
            const formData = await setupFormdData(form, 'export')
            await handleExportEvent(formData)  
            if(isSuccess.value){
                window.location.href = eventFile.value;
            }
        }
    }
</script>