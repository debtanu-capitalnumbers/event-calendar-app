<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Edit Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">                                
                <EventOldImage :form="form" :errors="errors"/>
                <EventTitle :form="form" :errors="errors" @doingValidation="validateData"/>
                <EventDescription :form="form" :errors="errors" @doingValidation="validateData"/>                
                <EventLocation :form="form" :errors="errors" @doingValidation="validateData"/>                 
                <EventCoverImage :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventCategory :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventStartDate :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventStartTime :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventEndTime :form="form" :errors="errors" @doingValidation="validateData"/>
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
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import EventOldImage from '../../components/events/inputs/EventOldImage.vue';
    import EventTitle from '../../components/events/inputs/EventTitle.vue';
    import EventDescription from '../../components/events/inputs/EventDescription.vue';
    import EventLocation from '../../components/events/inputs/EventLocation.vue';
    import EventCoverImage from '../../components/events/inputs/EventCoverImage.vue';
    import EventCategory from '../../components/events/inputs/EventCategory.vue';
    import EventStartDate from '../../components/events/inputs/EventStartDate.vue';
    import EventStartTime from '../../components/events/inputs/EventStartTime.vue';
    import EventEndTime from '../../components/events/inputs/EventEndTime.vue';
    import EventSubmitButton from '../../components/events/inputs/EventSubmitButton.vue';  
    import EventResetButton from '../../components/events/inputs/EventResetButton.vue'; 
    import { doResetFormData, doValidation, setupFormdData } from '../../helper/EventHelper.js';    

    const store = useEventStore()
    const { handleShowEvent, handleUpdateEvent } = store
    const { event, isShowLoader } = storeToRefs(store)
    const errors = ref({})
    const router = useRouter()
      
    const initialState = defineProps({
        id: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        location: { type: String, default: '' },
        event_category: { type: String, default: '' },
        event_start_date: { type: String, default: '' },
        event_start_time: { type: Object, default: {} },
        event_end_time: { type: Object, default: {} },
        cover_image: { type: Object, default: {} },
        download_path: { type: String, default: '' },
    })
    
    const form = reactive({ ... initialState });

    
    
    onMounted(async () => {
        errors.value = {};
        event.value = {};
        await handleShowEvent(router.currentRoute.value.params.id) 
        form.id = event.value.id;
        form.title = event.value.title;
        form.description = event.value.description;
        form.location = event.value.location;
        form.event_category = event.value.event_category;
        form.event_start_date = event.value.event_start_date;
        form.event_start_time.hours = event.value.event_start_time_hours;
        form.event_start_time.minutes = event.value.event_start_time_minutes;
        form.event_start_time.seconds = event.value.event_start_time_seconds;
        form.event_end_time.hours = event.value.event_end_time_hours;
        form.event_end_time.minutes = event.value.event_end_time_minutes;
        form.event_end_time.seconds = event.value.event_end_time_seconds;
        form.download_path = event.value.download_path;
    })

    const resetFormData = async () => {
        await doResetFormData(form, initialState)
    }

    const validateData = async (field) => {
        const result = await doValidation(form, field, errors, 'edit')
        return result;
    }

    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){ 
            const formData = await setupFormdData(form, 'edit') 
            await handleUpdateEvent(form.id, formData)
        }
    }
</script>