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
                    <input ref="title" type="text" v-model="form.title" @blur="validateData('title')" class="form-control border-0 border-bottom border-radius-0" :class="{ 'is-invalid': errors.title && errors.title[0] }" id="title" name="title" placeholder="Title"  maxlength="100" />
                    
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
    import { onMounted, ref ,reactive, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import { VueEditor } from "vue3-editor";
    import imagedefaultUrl from '../../assets/image-placeholder.png';
    import moment from 'moment';
    import { notify } from "@kyvg/vue3-notification";
    import VueDatePicker from '@vuepic/vue-datepicker';
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers } from '@vuelidate/validators';

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
        event_start_time: { type: Object, default: {} },
        event_end_time: { type: Object, default: {} },
        cover_image: { type: Object, default: {} },
    })
    
    const form = reactive({ ... initialState });
    const isValidDate = (value) => {                    
        if(form.event_end_time.hours < form.event_start_time.hours) {              
            return false;
        } else if(form.event_end_time.hours === form.event_start_time.hours && form.event_end_time.minutes <= form.event_start_time.minutes) { 
            return false;
        } else {
            return true;
        }
    }
    const rules = computed(() => { 
        return {
            title: { required: helpers.withMessage('Title is required', required) },
            description: { required: helpers.withMessage('Description is required', required) },
            location: { required: helpers.withMessage('Location is required', required) },
            event_category: { required: helpers.withMessage('Event category is required', required) },
            event_start_date: { required: helpers.withMessage('Event start date is required', required) },
            event_start_time: { required: helpers.withMessage('Event start time is required', required) },
            event_end_time: { required: helpers.withMessage('Event end time is required', required), isValidDate: helpers.withMessage('The event end time must be greater than start time', isValidDate) },
            cover_image: "",
            download_path: "",
        };      
    });
    const v$ = useVuelidate(rules, form);


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

    const updatePhoto = (files) => {
        if (!files.length) {
            imageData.value = form.cover_image = null
            return
        } {
            const size = files[0].size
            const type = files[0].type
            
            if(type !== "image/png" && type !== "image/jpg" && type !== "image/jpeg"){
                errors.value.cover_image = ["Only support JPG/JPEG/PNG format."]
                //cover_image.scrollIntoView({ behavior: 'smooth' });
                return
            }
            if(size > (1024*1024*4)){
                errors.value.cover_image = ["Maximum upload image size 4MB."]
                
                //cover_image.scrollIntoView({ behavior: 'smooth' });
                return
            }
            
            
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = (event) => {
                imageData.value = event.target.result
            };
            
            // Store the file data
            form.cover_image = {
                name: files[0].name,
                data: files[0]
            };
        }
    }

    const resetForm = () => {
        Object.assign(form, initialState);
        router.push({ name: 'events' });
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

    // Creates a submission handler
    // It validate all fields and doesn't call your function unless all fields are valid
    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){ 
            form.event_start_date = moment(form.event_start_date).format("YYYY-MM-DD")
            form.event_start_time = moment(form.event_start_time).format("hh:mm") + ':00'
            form.event_end_time = moment(form.event_end_time).format("hh:mm") + ':00' 

            let formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('location', form.location);
            formData.append('event_category', form.event_category);
            formData.append('event_start_date', form.event_start_date);
            formData.append('event_start_time', form.event_start_time);
            formData.append('event_end_time', form.event_end_time);
            if(form.cover_image.data && form.cover_image.name) { formData.append('cover_image', form.cover_image.data, form.cover_image.name); }
            await handleCreateEvent(formData)  
            if(status.value === 200 || status.value === 201){                
                router.push({ name: 'events' })
            }
        }
    }


</script>