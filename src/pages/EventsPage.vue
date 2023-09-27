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
    await fetchAllEvents('fresh')
})
</script>