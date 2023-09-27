<template>    
    <div class="container">
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Add Event</h4></div>
        </div>
        <div class="p-3 border">{{ form }}
            <form @submit.prevent="handleSubmit">
                <div class="row p-3 col-md-10 form-group required">
                    <label for="title" class="control-label">Title</label>
                    <input type="text" v-model="form.title" class="form-control border-0 border-bottom" :class="{ 'is-invalid': errors.title && errors.title[0] }" id="title" name="title" placeholder="Title"  maxlength="100" />
                    
                    <div class="col-md-12">
                        <span class="float-end">{{titleLengthCount}}/100</span>
                    </div>
                    <div class="invalid-feedback" v-if="errors.title && errors.title[0]">
                        {{ errors.title && errors.title[0] }}
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <label for="description" class="control-label">Description</label>
                    <input type="text" v-model="form.description" class="form-control border-0 border-bottom" id="description" name="description" placeholder="description"  maxlength="100" />
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <label for="location" class="control-label">Location</label>
                    <input type="text" v-model="form.location" class="form-control border-0 border-bottom" id="location" name="location" placeholder="location"  maxlength="100" />
                    
                    <div class="col-md-12">
                        <span class="float-end">{{locationLengthCount}}/100</span>
                    </div>
                </div>
                <div class="row p-3 col-md-10 form-group required">
                    <label for="event_category" class="control-label">Event Category</label>
                    <input type="text" v-model="form.event_category" class="form-control border-0 border-bottom" id="event_category" name="event_category" placeholder="Select Event Category"  maxlength="100" />
                </div>
                <button class="w-10 btn btn-lg btn-primary" type="submit">Submit</button>
                <button class="w-10 btn btn-lg btn-primary"  @click.prevent="resetForm">back</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
    .form-group.required .control-label:after {
    content:"*";
    color:red;
    }
</style>
<script setup>
    import { onMounted, reactive, computed, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { useEventStore } from "../stores/event";

    const store = useEventStore()
    const { errors } = storeToRefs(store)
    
    const initialState = defineProps({
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        location: {
            type: String,
            default: null
        },
        event_category: {
            type: String,
            default: null
        },
    })

    const form = reactive({ ... initialState });   
     
    const titleLengthCount = computed(
        () => (form.title !== null) ? form.title.length : 0
    )        
    const locationLengthCount = computed(
        () => (form.location !== null) ? form.location.length : 0
    )
    
    // const validateData = (form) => {
    //     if(form.title === '' || form.title === null){
    //         errors.value.title = ["Title should not be blank."]
    //     }
    // }
    
    const resetForm = () => {
        Object.assign(form, initialState);
        console.log(form);
    }
    const handleSubmit = async () => {
        // validateData(form);
        console.log(form);
        // errors.value = ''
        // await handleRegister(form)
        // if (!isLoggedIn.value) {
        //     router.push({ name: 'events' })
        // }
    }
</script>