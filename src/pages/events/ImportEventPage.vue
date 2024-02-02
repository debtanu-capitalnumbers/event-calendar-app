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
    @import '../../assets/css/EventStyle.css'; 
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