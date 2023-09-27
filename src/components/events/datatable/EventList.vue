<template>
    <div class="row mb-3">  
        <div class="col-md-3">
            <EventPerPage />      
        </div>
        <div class="col-md-9">
            <div class="form-inline d-flex justify-content-end">
                <div class="form-group">
                    <EventSearch />
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <table class="table table-striped table-hover">
                <thead>                    
                    <EventTableHeader />
                </thead>
                <tbody>
                    <Event v-for="event in events" 
                    :event="event" 
                    :key="event.id" 
                    @activeted="handleActiveEvent"
                    />
                </tbody>
            </table>
            <EventPagination />
        </div>
    </div>
</template>
<script setup>
import Event from "./Event.vue";
import EventPerPage from "./EventPerPage.vue";
import EventSearch from "./EventSearch.vue";
import EventTableHeader from "./EventTableHeader.vue";
import EventPagination from "./EventPagination.vue";

import { useEventStore } from "../../../stores/event";

const store = useEventStore()
const { handleActiveEvent } = store

defineProps({
    events: Array
})
</script>