import { ref, computed } from 'vue'
import { notify } from "@kyvg/vue3-notification";
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

const current_form = ref({});

const isValidDate = (value) => {   
    console.log(current_form.value.event_start_time);   
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

const rules = computed(() => { 
    return {
        title: { required: helpers.withMessage('Title is required', required), minLength: helpers.withMessage(`Title must be atleast 2 character long`, minLength(2)) },
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

async function doValidation (form, field, errors)  {
    current_form.value = form
    const v$ = useVuelidate(rules, form);
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

async function setupFormdData (form)  {
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
    return formData;
}

export {
    doUpdatePhoto,
    doValidation,
    setupFormdData,
}