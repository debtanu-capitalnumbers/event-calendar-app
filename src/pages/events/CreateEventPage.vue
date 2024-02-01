<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Add Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="handleSubmit">
                <div class="row p-3 col-md-10 form-group required">
                    <span for="title" class="control-label">Title</span>
                    <input ref="title" type="text" v-model="form.title" @keyup="validateData('title')" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.title && errors.title[0] }" id="title" name="title" placeholder="Title"  maxlength="100" />
                    
                    <div class="col-md-12">
                        <span class="float-end">{{titleLengthCount}}/100</span>
                    </div>
                    <div class="invalid-feedback" v-if="errors.title && errors.title[0]">
                        {{ errors.title && errors.title[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="description" class="control-label">Description</span>                    
                    <vue-editor ref="description" v-model="form.description" @blur="validateData('description')" class="form-control border-0" id="description" name="description" placeholder="Description" :class="{ 'is-invalid': errors.description && errors.description[0] }"></vue-editor>
                    <div class="invalid-feedback" v-if="errors.description && errors.description[0]">
                        {{ errors.description && errors.description[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="location" class="control-label">Location</span>
                    <input ref="location" type="text" v-model="form.location" @blur="validateData('location')" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.location && errors.location[0] }" id="location" name="location" placeholder="location"  maxlength="100" />
                    
                    <div class="col-md-12">
                        <span class="float-end">{{locationLengthCount}}/100</span>
                    </div>
                    <div class="invalid-feedback" v-if="errors.location && errors.location[0]">
                        {{ errors.location && errors.location[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group">
                    <span for="cover_image" class="control-label">Cover Image</span>
                    <div class="custom-file">
                        <input ref="cover_image" type="file" class="custom-file-input" name="cover_image" id="cover_image" @change="$event => updatePhoto($event.target.files)">
                        <span class="custom-file-label border-0 border-bottom form-control" for="cover_image" :class="{ 'is-invalid': errors.cover_image && errors.cover_image[0] }">{{ computedinputFileLabel }}</span>
                    </div>

                    <div class="col-md-12">
                        <span class="float-start image_info">Maximum upload image size 4MB. Only support JPG/JPEG/PNG format.</span>
                    </div>
                    <div class="mb-1 d-flex justify-content-left p-0">
                        <img :src="imageUrl" alt="example placeholder" :style="{ 'max-width':'150px', 'max-height':'150px'}"/>
                    </div>
                    <div class="invalid-feedback" v-if="errors.cover_image && errors.cover_image[0]">
                        {{ errors.cover_image && errors.cover_image[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_category" class="control-label">Event Category</span>
                    <select ref="event_category" class="form-select border-0 border-bottom border-radius-0" @blur="validateData('event_category')" :class="{ 'is-invalid': errors.event_category && errors.event_category[0] }" aria-label="Default select example" name="event_category" id="event_category" v-model="form.event_category">
                        <option value="Library/Books">Library/Books</option>
                        <option value="Community Engagement">Community Engagement</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.event_category && errors.event_category[0]">
                        {{ errors.event_category && errors.event_category[0] }}
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
                    <span for="event_start_time" class="control-label">Start Time</span>
                    <VueDatePicker ref="event_start_time" v-model="form.event_start_time" @blur="validateData('event_start_time')" :class="{ 'is-invalid': errors.event_start_time && errors.event_start_time[0] }" time-picker :clearable="false" class="form-control border-0 p-0" id="event_start_time" name="event_start_time"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_start_time && errors.event_start_time[0]">
                        {{ errors.event_start_time && errors.event_start_time[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_end_time" class="control-label">End Time</span>
                    <VueDatePicker ref="event_end_time" v-model="form.event_end_time" @blur="validateData('event_end_time')" :class="{ 'is-invalid': errors.event_end_time && errors.event_end_time[0] }" time-picker :clearable="false" class="form-control border-0 p-0" id="event_end_time" name="event_end_time"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_end_time && errors.event_end_time[0]">
                        {{ errors.event_end_time && errors.event_end_time[0] }}
                    </div>
                </div>
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
    import { VueEditor } from "vue3-editor";
    import imagedefaultUrl from '../../assets/image-placeholder.png';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import { doValidation, doUpdatePhoto, setupFormdData } from '../../helper/EventHelper.js'    

    const store = useEventStore()
    const { handleCreateEvent } = store
    const { status, isShowLoader } = storeToRefs(store)
    const errors = ref({})
    const router = useRouter()
    const imageData = ref(null)
    
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
    
    const titleLengthCount = computed(
        () => (form.title !== null) ? form.title.length : 0
    )        
    const locationLengthCount = computed(
        () => (form.location !== null) ? form.location.length : 0
    )
    const computedinputFileLabel = computed(
        () => (form.cover_image !== null) ? form.cover_image.name : "Choose file"
    )
    const imageUrl = computed(
        () => (imageData.value !== null) ? imageData.value : imagedefaultUrl
    )

    onMounted(async () => {
        errors.value = {};
    })

    const updatePhoto  = (files) => {
        doUpdatePhoto(files, form, imageData)
    } 

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
            const formData = await setupFormdData(form)            
            await handleCreateEvent(formData)  
            if(status.value === 200 || status.value === 201){                
                router.push({ name: 'events' })
            }
        }
    }


</script>