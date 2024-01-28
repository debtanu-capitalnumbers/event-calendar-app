<template>
    <div class="container">
        <Loader v-show="isShowLoader"/>
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Calendar</h4></div>
        </div>
        <div class="p-3 border">
            <FullCalendar :options="calendarOptions" />
        </div>
    </div>
</template>

<script setup>
    import { onMounted, reactive } from "vue";
    import { storeToRefs } from 'pinia';
    import { useEventStore } from "../../stores/event";
    import Loader from '../../components/Loader.vue';
    import { notify } from "@kyvg/vue3-notification";
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import interactionPlugin from '@fullcalendar/interaction';

    const store = useEventStore()
    const { fetchCalendarEvents } = store
    const { calendarEvents, isShowLoader } = storeToRefs(store)

    const handleDateClick = async () => {
        console.log('handleDateClick');
    }


    const calendarOptions = reactive({
        plugins: [ dayGridPlugin, interactionPlugin ],
        height:1000,
        initialView: "dayGridMonth",
        // dateClick: handleDateClick,
        events: [],
        headerToolbar: { right: 'dayGridMonth,dayGridWeek,dayGridDay', center: 'title',left: 'prev next today', },
    }) 

    onMounted(async () => {
        await fetchCalendarEvents('fresh')
        calendarOptions.events = calendarEvents.value
    })

    

</script>