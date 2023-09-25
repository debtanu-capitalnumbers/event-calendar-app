<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Events</h4></div>
            <div class="col-sm-3"></div>
            <div class="col-sm-3"></div>
            <div class="col-sm-3">
                <router-link :to="{ name: 'createevent' }" >
                    <button type="button" class="btn btn-warning btn-sm mt-2">Create Event</button>
                </router-link>
            </div>
        </div>
        <hr/>
        
        <EventList  :events="events"/>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useEventStore } from "../stores/event";
import EventList from "../components/events/EventList.vue";

const store = useEventStore()
const { fetchAllEvents } = store
const { events, sortType, perPage, currentPage, orderColumn, filterName } = storeToRefs(store)

onMounted(async () => {
    let params = `?page=`+currentPage.value
    params = params + `&per_page=`+perPage.value
    params = params + `&sort_by=`+sortType.value
    params = params + `&sort_field_name=`+orderColumn.value
    params = params + `&search=`+filterName.value
    await fetchAllEvents(params)
})
</script>