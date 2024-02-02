<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Add Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">
                <EventTitle :form="form" :errors="errors" @doingValidation="validateData"/>
                <EventDescription :form="form" :errors="errors" @doingValidation="validateData"/>                
                <EventLocation :form="form" :errors="errors" @doingValidation="validateData"/>                 
                <EventCoverImage :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventCategory :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventStartDate :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventStartTime :form="form" :errors="errors" @doingValidation="validateData"/> 
                <EventEndTime :form="form" :errors="errors" @doingValidation="validateData"/>
                <button class="w-10 btn btn-warning m-1" type="submit">Submit</button>
                <button class="w-10 btn btn-secondary m-1"  @click.prevent="resetForm">back</button>
            </form>
        </div>
    </div>
</template>
<style>
    @import '../../assets/css/EventStyle.css';    
</style>
<script setup>
    import { onMounted, ref ,reactive, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import EventTitle from '../../components/events/inputs/EventTitle.vue';
    import EventDescription from '../../components/events/inputs/EventDescription.vue';
    import EventLocation from '../../components/events/inputs/EventLocation.vue';
    import EventCoverImage from '../../components/events/inputs/EventCoverImage.vue';
    import EventCategory from '../../components/events/inputs/EventCategory.vue';
    import EventStartDate from '../../components/events/inputs/EventStartDate.vue';
    import EventStartTime from '../../components/events/inputs/EventStartTime.vue';
    import EventEndTime from '../../components/events/inputs/EventEndTime.vue';
    import { doValidation, setupFormdData } from '../../helper/EventHelper.js';    

    const store = useEventStore()
    const { handleCreateEvent } = store
    const { status, isShowLoader } = storeToRefs(store)
    const errors = ref({})
    const router = useRouter()
    
    const initialState = defineProps({
        id: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        location: { type: String, default: '' },
        event_category: { type: String, default: '' },
        event_start_date: { type: String, default: '' },
        event_start_time: { type: Object, default: null },
        event_end_time: { type: Object, default: null },
        cover_image: { type: Object, default: null },
    })
    
    const form = reactive({ ... initialState });

    onMounted(async () => {
        errors.value = {};
    })

    const resetForm = () => {
        Object.assign(form, initialState);
        router.push({ name: 'events' });
    }

    const validateData = async (field) => {
        const result = await doValidation(form, field, errors)
        return result;
    }

    // Creates a submission handler
    // It validate all fields and doesn't call your function unless all fields are valid
    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){ 
            const formData = await setupFormdData(form, 'create')            
            await handleCreateEvent(formData)  
            if(status.value === 200 || status.value === 201){                
                router.push({ name: 'events' })
            }
        }
    }


</script>