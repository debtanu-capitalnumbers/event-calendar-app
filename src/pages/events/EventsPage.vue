<template>
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <EventNavbar />
        <EventList :events="events" />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useEventStore } from "../../stores/event";
import EventList from "../../components/events/datatable/EventList.vue";
import EventNavbar from "../../components/events/EventNavbar.vue";
import Loader from '../../components/Loader.vue';

const store = useEventStore()
const { fetchAllEvents } = store
const { events, sortType, perPage, currentPage, orderColumn, filterName, isShowLoader } = storeToRefs(store)

onMounted(async () => {
    await fetchAllEvents('fresh')
})
</script>