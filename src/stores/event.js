import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allEvents } from "../http/event-api";

// export const useEventStore = defineStore(    'eventStore',    {
//     state: () => ({
//         events: []
//     }),
//     getters: {
//         activeEvents:  (state) => state.events.filter((event) => event.is_active),
//         inactiveEvents() {
//             return this.events.filter((event) => !event.is_active)
//         },
//     },
//     actions: {
//         async fetchAllEvents () {
//             const { data } = await allEvents()
//             this.events = data.data
//         },
//     },persist: {
//     storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
//   },
    
// });


export const useEventStore = defineStore("eventStore", () => {
  const events = ref([]);
  const activeEvents = computed(() =>
      events.value.filter((event) => !event.is_active)
    );
    const inactiveEvents = computed(() =>
      events.value.filter((event) => event.is_active)
    );
    const fetchAllEvents = async () => {
      const { data } = await allEvents();
      events.value = data.data;
    };
    return {
      events,
      activeEvents,
      inactiveEvents,
      fetchAllEvents,
    };
},
{
  persist: true,
});