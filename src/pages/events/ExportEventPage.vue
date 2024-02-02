<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Export Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">                
                <EventExportType :form="form" :errors="errors"/>
                <EventStartDate :form="form" :errors="errors" @doingValidation="validateData"/>
                <EventEndDate :form="form" :errors="errors" @doingValidation="validateData"/>
                <EventSubmitButton />
                <EventResetButton  @doingResetForm="resetFormData"/>                
            </form>
        </div>
    </div>
</template>
<style>
    @import '../../assets/css/EventStyle.css'; 
</style>
<script setup>
    import { onMounted, ref ,reactive } from "vue";
    import { storeToRefs } from "pinia";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import { doResetFormData, doValidation, setupFormdData } from '../../helper/EventHelper.js'; 
    import EventStartDate from '../../components/events/inputs/EventStartDate.vue';  
    import EventEndDate from '../../components/events/inputs/EventEndDate.vue';  
    import EventExportType from '../../components/events/inputs/EventExportType.vue';  
    import EventSubmitButton from '../../components/events/inputs/EventSubmitButton.vue';  
    import EventResetButton from '../../components/events/inputs/EventResetButton.vue';  

    const store = useEventStore()
    const { handleExportEvent } = store
    const { isSuccess, isShowLoader, eventFile } = storeToRefs(store)
    const errors = ref({})
    
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
    
    const resetFormData = async () => {
        await doResetFormData(form, initialState)
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