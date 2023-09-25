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
  const events = ref([])
  const currentPage = ref(1)
  const startPage = ref(1)
  const endPage = ref(1)
  const totalRecord = ref(1)
  const pages = ref([])
  const orderDir = ref(1)
  const perPage = ref(10)
  const filterName = ref('')
  const orderColumn = ref('name')
  const sortType = ref('DESC')
  const fetchAllEvents = async (params) => {
    const { data } = await allEvents(params);
    events.value = data.data;
    currentPage.value = data.meta.current_page;
    endPage.value = data.meta.last_page;
    totalRecord.value = data.meta.total;
    
  };
  return {
    events,
    pages,
    currentPage,
    startPage,
    endPage,
    perPage,
    orderDir,
    filterName,
    orderColumn,
    sortType,
    totalRecord,
    fetchAllEvents,
  };
},
{
  persist: true,
});