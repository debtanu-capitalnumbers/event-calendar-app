<template>    
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Add Event</h4></div>
        </div>
        <div class="p-3 border">
            <form @submit.prevent="onSubmit">
                <div class="row p-3 col-md-10 form-group required">
                    <span for="title" class="control-label">title</span>
                    <input type="text" v-model="title" v-bind="titleAttrs" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.title && errors.title[0] }" id="title" name="title" placeholder="title"  maxlength="100" />
                    
                    <div class="col-md-12">
                        <span class="float-end">{{titleLengthCount}}/100</span>
                    </div>
                    <div class="invalid-feedback" v-if="errors.title">
                        {{ errors.title }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="description" class="control-label">Description</span>                    
                    <vue-editor v-model="description" v-bind="descriptionAttrs" class="form-control border-0" id="description" name="description" placeholder="Description" :class="{ 'is-invalid': errors.description }"></vue-editor>
                    <div class="invalid-feedback" v-if="errors.description">
                        {{ errors.description }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="location" class="control-label">Location</span>
                    <input type="text" v-model="location" v-bind="locationAttrs" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.location }" id="location" name="location" placeholder="location"  maxlength="100" />
                    
                    <div class="col-md-12">
                        <span class="float-end">{{locationLengthCount}}/100</span>
                    </div>
                    <div class="invalid-feedback" v-if="errors.location ">
                        {{ errors.location }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group">
                    <span for="cover_image" class="control-label">Cover Image</span>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" name="cover_image" id="cover_image" @change="$event => updatePhoto($event.target.files)">
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
                    <select class="form-select border-0 border-bottom border-radius-0" v-model="event_category" v-bind="event_categoryAttrs" :class="{ 'is-invalid': errors.event_category }" aria-label="Default select example" name="event_category" id="event_category">
                        <option value="Library/Books">Library/Books</option>
                        <option value="Community Engagement">Community Engagement</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.event_category">
                        {{ errors.event_category }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_start_date" class="control-label">Start Date</span>
                    <VueDatePicker v-model="event_start_date" v-bind="event_start_dateAttrs" :class="{ 'is-invalid': errors.event_start_date }" :enable-time-picker="false" :clearable="false" class="form-control border-0 p-0" id="event_start_date" name="event_start_date"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_start_date">
                        {{ errors.event_start_date }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_start_time" class="control-label">Start Time</span>
                    <VueDatePicker v-model="event_start_time" v-bind="event_start_timeAttrs" :class="{ 'is-invalid': errors.event_start_time }" time-picker :clearable="false" class="form-control border-0 p-0" id="event_start_time" name="event_start_time"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_start_time">
                        {{ errors.event_start_time }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <span for="event_end_time" class="control-label">End Time</span>
                    <VueDatePicker v-model="event_end_time" v-bind="event_end_timeAttrs" :class="{ 'is-invalid': errors.event_end_time }" time-picker :clearable="false" class="form-control border-0 p-0" id="event_end_time" name="event_end_time"></VueDatePicker>
                    <div class="invalid-feedback" v-if="errors.event_end_time">
                        {{ errors.event_end_time }}
                    </div>
                </div>
                <button class="w-10 btn btn-warning m-1" type="submit">Submit</button>
                <button class="w-10 btn btn-secondary m-1"  @click.prevent="resetForm">back</button>
            </form>
        </div>
    </div>
</template>
<style>
    div#description {
        height: auto;
    }
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
    .form-control.is-invalid>.ql-container, .was-validated .form-control:invalid>.ql-container {
        border: 1px solid #dc3545 !important;
    } 
    /* .form-control.is-invalid.dp__theme_light, .was-validated .form-control:invalid.dp__theme_light {
        background-position: right calc(2.375em + 0.1875rem) center;
    } */
    .dp__icon {
        stroke: currentcolor;
        fill: currentcolor;
        inset-inline-end: 0 !important;
        inset-inline: auto;
        /* background-color: #efefef; */
        /* padding: 10px; */
        border-radius: 0px 3px 3px 0px;
        margin-right: 1px;
        /* border-left: 1px solid #ddd; */
    }
    .dp__pointer {
        cursor: pointer;
        padding-right: 36px;
    }
    input.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
        background-color: unset;
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
    import { VueEditor } from "vue3-editor";
    import imagedefaultUrl from '../../assets/image-placeholder.png';
    import moment from 'moment';
    import { notify } from "@kyvg/vue3-notification";
    import VueDatePicker from '@vuepic/vue-datepicker';
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';

    const store = useEventStore()
    const { handleCreateEvent } = store
    const { errorsList, status, isShowLoader } = storeToRefs(store)

    const router = useRouter()
    const imageData = ref(null)
    const cover_image = ref({name: null, data: null})
    const DATE_GREATER_ERROR_MESSAGE = "The event end time must be greater than start time.";
    
    // const initialState = defineProps({
    //     cover_image: {
    //         type: Object,
    //         default: {}
    //     },
    // })
    // const form = reactive({ ... initialState }); 
    // onMounted(async () => {
    //     errors.value = {};
    // }) 
    

    // Using custom test method
    function isValidDate(message) {
    return this.test("isValidDate", message, function (value) {
        const { path, createError } = this;

        if (!value) {
        return createError({ path, message });
        }
                
        const event_start_time_hours = moment(event_start_time.value).format("h");
        const event_start_time_minutes = moment(event_start_time.value).format("m");
        const event_end_time_hours = moment(event_end_time.value).format("h");
        const event_end_time_minutes = moment(event_end_time.value).format("m");

        if(event_end_time_hours < event_start_time_hours) {                
            return createError({ path, message: DATE_GREATER_ERROR_MESSAGE });
        } else if(event_end_time_hours === event_start_time_hours && event_end_time_minutes <= event_start_time_minutes) {                
            return createError({ path, message: DATE_GREATER_ERROR_MESSAGE });
        }

        return true;
    });
    }


    yup.addMethod(yup.mixed, "isValidDate", isValidDate);
    const { errors, handleSubmit, defineField } = useForm({
        initialValues: {
            title: '',
            description: '',
            location: '',
            event_category: '',
            event_start_date: '',
            event_start_time: '',
            event_end_time: '',
        },
        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            description: yup.string().required('Description is required'),
            location: yup.string().required('Location is required'),
            event_category: yup.string().required('Event category is required'),
            event_start_date: yup.string().required("Event start date is required."),
            event_start_time: yup.mixed().required('Event start time is required'),
            event_end_time: yup.mixed().isValidDate('Event end time is required'),
        }),
    });

    const [title, titleAttrs] = defineField('title');
    const [description, descriptionAttrs] = defineField('description');
    const [location, locationAttrs] = defineField('location');
    const [event_category, event_categoryAttrs] = defineField('event_category');
    const [event_start_date, event_start_dateAttrs] = defineField('event_start_date');
    const [event_start_time, event_start_timeAttrs] = defineField('event_start_time');
    const [event_end_time, event_end_timeAttrs] = defineField('event_end_time');


    const titleLengthCount = computed(
        () => (title.value && title.value !== null) ? title.value.length : 0
    )           
    const locationLengthCount = computed(
        () => (location.value && location.value !== null) ? location.value.length : 0
    )
    const computedinputFileLabel = computed(
        () => (cover_image.value !== null) ? cover_image.value.name : "Choose file"
    )
    const imageUrl = computed(
        () => {
            return (imageData.value !== null) ? imageData.value : imagedefaultUrl
        }
    )
    const event_start_date_value = computed(
        () => (event_start_date.value !== '') ? moment(event_start_date.value).format("YYYY-MM-DD") : ""
    )
    const event_start_time_value = computed(
        () => (event_start_date.value !== '') ? moment(event_start_time.value).format("hh:mm") + ':00' : ""
    )
    const event_end_time_value = computed(
        () => (event_start_date.value !== '') ? moment(event_end_time.value).format("hh:mm") + ':00' : ""
    )

    // Creates a submission handler
    // It validate all fields and doesn't call your function unless all fields are valid
    const onSubmit = handleSubmit(async (values, actions) => {        
        let formData = new FormData();
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('location', location.value);
        formData.append('event_category', event_category.value);
        formData.append('event_start_date', event_start_date_value.value);
        formData.append('event_start_time', event_start_time_value.value);
        formData.append('event_end_time', event_end_time_value.value);
        if(cover_image.value.data && cover_image.value.name) { formData.append('cover_image', cover_image.value.data, cover_image.value.name); }
        await handleCreateEvent(formData)         
        
        if(errorsList.value.common) {
            notify({
                title: errorsList.value.common,
                type: 'error',
            });
        }
        if(status.value === 200 || status.value === 201){                
            router.push({ name: 'events' })
        }

        // set multiple fields errors
        actions.setErrors({ 
            title: errorsList.value.title[0], 
            description: errorsList.value.description[0], 
            location: errorsList.value.location[0], 
            event_category: errorsList.value.event_category[0], 
            event_start_date: errorsList.value.event_start_date[0], 
            event_start_time: errorsList.value.event_start_time[0], 
            event_end_time: errorsList.value.event_end_time[0], 
        });
        
        // reset the form
        // actions.resetForm();
    });
    
    const updatePhoto = (files) => {
        if (!files.length) {
            imageData.value = cover_image.value.name = cover_image.value.data = null
            return
        } {
            const size = files[0].size
            const type = files[0].type
            
            if(type !== "image/png" && type !== "image/jpg" && type !== "image/jpeg"){
                errors.value.cover_image = ["Only support JPG/JPEG/PNG format."]
                return
            }
            if(size > (1024*1024*4)){
                errors.value.cover_image = ["Maximum upload image size 4MB."]
                return
            }
            
            
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = (event) => {
                imageData.value = event.target.result
            };
            
            // Store the file data
            cover_image.value.name = files[0].name;
            cover_image.value.data = files[0];
        }
    }

</script>