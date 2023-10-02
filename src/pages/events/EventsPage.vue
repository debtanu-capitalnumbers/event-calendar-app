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
import { notify } from "@kyvg/vue3-notification";

const store = useEventStore()
const { fetchAllEvents } = store
const { events, sortType, perPage, currentPage, orderColumn, filterName, isShowLoader, errors } = storeToRefs(store)

onMounted(async () => {
    await fetchAllEvents('fresh')
    if(errors.value.common) {
        notify({
            title: errors.value.common,
            type: 'error',
        });
    }
})
</script>