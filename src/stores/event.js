import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allEvents } from "../http/event-api";

export const useEventStore = defineStore("eventStore", () => {
  const events = ref([])
  const currentPage = ref(1)
  const startPage = ref(1)
  const lastPage = ref(1)
  const totalRecord = ref(1)
  const pages = ref([])
  const perPage = ref(10)
  const filterName = ref('')
  const orderColumn = ref('name')
  const orderDir = ref(1)
  const sortType = ref('DESC')
  const fetchAllEvents = async () => {
    
    let setParams = `?page=`+currentPage.value
    setParams = setParams + `&per_page=`+perPage.value
    setParams = setParams + `&sort_by=`+sortType.value
    setParams = setParams + `&sort_field_name=`+orderColumn.value
    setParams = setParams + `&search=`+filterName.value
    const { data } = await allEvents(setParams);
    events.value = data.data;
    currentPage.value = data.meta.current_page;
    lastPage.value = data.meta.last_page;
    totalRecord.value = data.meta.total;
    
  };
  return {
    events,
    pages,
    currentPage,
    startPage,
    lastPage,
    perPage,
    filterName,
    orderDir,
    orderColumn,
    sortType,
    totalRecord,
    fetchAllEvents,
  };
},
{
  persist: true,
});