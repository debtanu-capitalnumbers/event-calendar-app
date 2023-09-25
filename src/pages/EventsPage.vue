<template>
    <div class="container">
        <EventNavbar />
        <EventList  :events="events"/>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useEventStore } from "../stores/event";
import EventList from "../components/events/datatable/EventList.vue";
import EventNavbar from "../components/events/EventNavbar.vue";

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