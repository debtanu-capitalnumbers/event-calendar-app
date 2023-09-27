import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allEvents, activeEvent } from "../http/event-api";

export const useEventStore = defineStore("eventStore", () => {
  const events = ref([])
  const errors = ref({});
  const currentPage = ref(1)
  const startPage = ref(1)
  const lastPage = ref(1)
  const totalRecord = ref(1)
  const pages = ref([])
  const perPage = ref(10)
  const filterName = ref('')
  const orderColumn = ref('title')
  const orderDir = ref(1)
  const sortType = ref('DESC')
  const startPageLink = ref(1)
  const endPageLink = ref(1)
  const nowCurrentPage = ref(1)
  const isApiCallComplete = ref(false)

  const fetchAllEvents = async (type) => {
    isApiCallComplete.value = false;
    let setParams = '?'
    if(type !== 'fresh'){
      setParams = setParams + `page=`+currentPage.value
      setParams = setParams + `&per_page=`+perPage.value
      setParams = setParams + `&sort_by=`+sortType.value
      setParams = setParams + `&sort_field_name=`+orderColumn.value
      setParams = setParams + `&search=`+filterName.value
    } else {
      currentPage.value = 1
      perPage.value = 10
      sortType.value = 'DESC'
      orderColumn.value = 'title'
      filterName.value = ''
    }
    const { data} = await allEvents(setParams)
    isApiCallComplete.value = true;
    events.value = data.data;
    currentPage.value = data.meta.current_page;
    lastPage.value = data.meta.last_page;
    totalRecord.value = data.meta.total;
    
    const setPageLink = paginationPages()
    
  };
  
  const handleActiveEvent = async (event) => {
    isApiCallComplete.value = false;
    const { data: updatedEvent } = await activeEvent(event.id, {
        is_active: event.is_active
    })
    isApiCallComplete.value = true;
    const currentEvent = events.value.find(item => item.id === event.id)
    currentEvent.is_active = updatedEvent.data.is_active
  }

  const paginationPages = () => { 
    pages.value.length = 0;
    pages.value.push(startPage.value)
    if( ((currentPage.value - 1) > (startPage.value + 2)) && lastPage.value > 5){   
      pages.value.push('...')  
      startPageLink.value = ((currentPage.value - 1) < (lastPage.value - 4)) ? (currentPage.value - 1) : (lastPage.value - 4);
    } else {
        startPageLink.value = startPage.value+1;
    }
    if( ((currentPage.value + 1) < (lastPage.value - 2)) && lastPage.value > 5){  
        endPageLink.value = ((currentPage.value + 1) > (startPage.value + 4)) ? (currentPage.value + 1) : (startPage.value + 4);
        for (let index = startPageLink.value; index <= endPageLink.value; index++) {
          pages.value.push(index)
        }
        pages.value.push('...')
    } else { 
        endPageLink.value = lastPage.value - 1;
        for (let index = startPageLink.value; index <= endPageLink.value; index++) {
          pages.value.push(index)
        }
    }
    if(startPage.value !== lastPage.value){
        pages.value.push(lastPage.value)
    }
    nowCurrentPage.value = currentPage.value
  }

  const handleSort = (column) => {
    orderDir.value = orderDir.value * -1
    sortType.value = (orderDir.value === 1) ?'DESC' : 'ASC'
    orderColumn.value = column
    
    fetchAllEvents('')
    paginationPages()
  }

  const handleSearch = () => {    
      fetchAllEvents('')
      paginationPages()
  }

  const handlePerPage = (perpage) => {    
      perPage.value = perpage
      currentPage.value = 1
      fetchAllEvents('')
      paginationPages()
  }




  const switchPage = (page) => {
      currentPage.value = page
      handleSearch()
  }
  const handlePrev = () => {
      if(startPage.value < currentPage.value){
          currentPage.value--
          handleSearch()
      }
  }
  const handleNext = () => {
      if(lastPage.value > currentPage.value){
          currentPage.value++
          handleSearch()
      }
  }

  const clearSearch = () => {
      filterName.value = ""
      handleSearch()
  }



  return {
    errors,
    isApiCallComplete,
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
    startPageLink,
    endPageLink,
    nowCurrentPage,
    fetchAllEvents,
    handleSort,
    handleSearch,
    handlePerPage,
    switchPage,
    handlePrev,
    handleNext,
    handleActiveEvent,
    clearSearch,
    paginationPages,
  };
},
{
  persist: true,
});