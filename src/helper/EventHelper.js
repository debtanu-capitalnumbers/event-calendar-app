import { ref, computed } from 'vue'
import { notify } from "@kyvg/vue3-notification";
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import moment from 'moment';
import { useRouter } from "vue-router";

const router = useRouter();
const current_form = ref({});

const isValidDateTime = (value) => {   
    if(current_form.value.event_start_time.length <= 0 || current_form.value.event_end_time.length <= 0){ 
        return false;
    } else if(current_form.value.event_end_time.hours < current_form.value.event_start_time.hours) {              
        return false;
    } else if(current_form.value.event_end_time.hours === current_form.value.event_start_time.hours && current_form.value.event_end_time.minutes <= current_form.value.event_start_time.minutes) { 
        return false;
    } else {
        return true;
    }
}

const isValidDate = (value) => {          
    const event_start_date = moment(current_form.event_start_date);
    const event_end_date = moment(current_form.event_end_date);          
    if(event_end_date <= event_start_date) {              
        return false;
    } else {
        return true;
    }
}

const createEditRules = computed(() => { 
    return {
        title: { required: helpers.withMessage('Title is required', required), minLength: helpers.withMessage(`Title must be atleast 2 character long`, minLength(2)) },
        description: { required: helpers.withMessage('Description is required', required) },
        location: { required: helpers.withMessage('Location is required', required) },
        event_category: { required: helpers.withMessage('Event category is required', required) },
        event_start_date: { required: helpers.withMessage('Event start date is required', required) },
        event_start_time: { required: helpers.withMessage('Event start time is required', required) },
        event_end_time: { required: helpers.withMessage('Event end time is required', required), isValidDateTime: helpers.withMessage('The event end time must be greater than start time', isValidDateTime) },
        cover_image: "",
        download_path: "",
    };      
});

const importRules = computed(() => { 
    return {
        import_type: { required: helpers.withMessage('Event Import type is required', required) },
        import_file: { required: helpers.withMessage('Event import file is required', required) },
    };      
});

const exportRules = computed(() => { 
    return {
        export_type: { required: helpers.withMessage('Event export type is required', required) },
        event_start_date: { required: helpers.withMessage('Event start date is required', required) },
        event_end_date: { required: helpers.withMessage('Event end date is required', required), isValidDate: helpers.withMessage('The event end date must be greater than start date', isValidDate) },
    };      
});

async function doValidation (form, field, errors, type)  {
    errors.value = {};
    let errorCount = 0;
    let notifyError = '';
    let result = true;
    let v$ = '';
    current_form.value = form
    if(type === 'create' || type === 'edit'){
        v$ = useVuelidate(createEditRules, form);
    } else if(type === 'export'){
        v$ = useVuelidate(exportRules, form);
    } else if(type === 'import'){
        v$ = useVuelidate(importRules, form);
    }
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
    
    if(errorCount >= 2 && field === 'value'){
        notifyError += ' (and ' + (-- errorCount) + ' more errors)';
        if(notifyError !== ""){
            notify({
                title: notifyError,
                type: 'error',
            });
        }
    }
    return result;
}

function doUpdatePhoto (files, form, imageData)  {
    if (!files.length) {
        imageData.value = form.cover_image = null
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
        form.cover_image = {
            name: files[0].name,
            data: files[0]
        };
    }
}

function doUpdateImportFile (files, form)  {
    if (!files.length) {
        return
    } {
        const size = files[0].size
        const type = files[0].type
        
        if(type !== "text/calendar" && type !== "text/csv"){
            errors.value.import_file = ["Only support ICS/CSV format."]
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

async function setupFormdData (form, type)  {
    const formData = new FormData();
    if(type === 'create' || type === 'edit'){
        form.event_start_date = moment(form.event_start_date).format("YYYY-MM-DD")
        form.event_start_time = moment(form.event_start_time).format("hh:mm") + ':00'
        form.event_end_time = moment(form.event_end_time).format("hh:mm") + ':00' 
    
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('location', form.location);
        formData.append('event_category', form.event_category);
        formData.append('event_start_date', form.event_start_date);
        formData.append('event_start_time', form.event_start_time);
        formData.append('event_end_time', form.event_end_time);
        if(form.cover_image.data && form.cover_image.name) { formData.append('cover_image', form.cover_image.data, form.cover_image.name); }
    } else if(type === 'export'){
        form.event_start_date = moment(form.event_start_date).format("YYYY-MM-DD")
        form.event_end_date = moment(form.event_end_date).format("YYYY-MM-DD")

        formData.append('export_type', form.export_type);
        formData.append('event_start_date', form.event_start_date);
        formData.append('event_end_date', form.event_end_date);
    } else if(type === 'import'){
        formData.append('import_type', form.import_type);
        if(form.import_file.data && form.import_file.name) { formData.append('import_file', form.import_file.data, form.import_file.name); }
    }
    return formData;
}

async function doResetFormData (form, initialState)  {
    Object.assign(form, initialState);
    router.push({ name: 'events' });
}

export {
    doUpdatePhoto,
    doUpdateImportFile,
    doValidation,
    doResetFormData,
    setupFormdData,
}