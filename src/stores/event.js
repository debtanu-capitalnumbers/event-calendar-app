import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allEvents, allCalendarEvents, activeEvent, removeEvent, createEvent, updateEvent, showEvent, exportEvent, importEvent } from "../http/event-api";

export const useEventStore = defineStore("eventStore", () => {
  const events = ref([])
  const calendarEvents = ref([])
  const event = ref({})
  const eventFile = ref({})
  const errors = ref({});
  const errorsList = ref({});
  const currentPage = ref(1)
  const startPage = ref(1)
  const lastPage = ref(1)
  const totalRecord = ref(0)
  const pages = ref([])
  const perPage = ref(10)
  const filterName = ref('')
  const orderColumn = ref('event_start_date_time')
  const orderDir = ref(1)
  const sortType = ref('DESC')
  const startPageLink = ref(1)
  const endPageLink = ref(1)
  const nowCurrentPage = ref(1)
  const isApiCallComplete = ref(false)
  const isShowLoader = ref(false)
  const status = ref(200);

  const isSuccess = computed(
    () => (status.value >= 200 && status.value < 300) ? true : false
  )

  const fetchAllEvents = async (type) => {    
    initValue()
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
      orderColumn.value = 'event_start_date_time'
      filterName.value = ''
    }
    try {
      await allEvents(setParams).then((response) => {
        status.value = response.status;    
        events.value = response.data.data;
        currentPage.value = response.data.meta.current_page;
        lastPage.value = response.data.meta.last_page;
        totalRecord.value = response.data.meta.total;
        
      });
    } catch (error) {
      events.value = [];
      currentPage.value = 1;
      lastPage.value = 1;
      totalRecord.value = 0;
      if (error.response && error.response.status) {
        status.value = error.response.status
      }
      if (error.response && status.value === 422) {
        errors.value = error.response.data.errors;
      }
      if(error.response.data.message){
        errors.value.common = error.response.data.message;
      }
    }
    paginationPages()
    resetValue()
  };

  const fetchCalendarEvents = async (type) => {    
    initValue()
    try {
      await allCalendarEvents().then((response) => {  
        calendarEvents.value = response.data.data;              
      });
    } catch (error) {
      calendarEvents.value = [];
      if (error.response && error.response.status) {
        status.value = error.response.status
      }
      if (error.response && status.value === 422) {
        errors.value = error.response.data.errors;
      }
      if(error.response.data.message){
        errors.value.common = error.response.data.message;
      }
    }
    resetValue()
  };

  const handleCreateEvent = async (form) => {
    initValue()
    try {
      await createEvent(form).then((response) => {
        status.value = response.status;  
      });
    } catch (error) {
        if (error.response && error.response.status) {
            status.value = error.response.status
        }
        if (error.response && status.value === 422) {
            errorsList.value = error.response.data.errors;
        }
        if(error.response.data.message){
          errorsList.value.common = error.response.data.message;
        }
    }  
    resetValue()  
  };

  const handleUpdateEvent = async (id, form) => {
    initValue()
    try {
      await updateEvent(id, form).then((response) => {
        status.value = response.status;  
      });
    } catch (error) {
        if (error.response && error.response.status) {
            status.value = error.response.status
        }
        if (error.response && status.value === 422) {
            errors.value = error.response.data.errors;
        }
        if(error.response.data.message){
          errors.value.common = error.response.data.message;
        }
    }  
    resetValue()  
  };

  const handleShowEvent = async (id) => {
    initValue()
    try {
      await showEvent(id).then((response) => {
        status.value = response.status; 
        event.value = response.data.data; 
      });
    } catch (error) {
        if (error.response && error.response.status) {
            status.value = error.response.status
        }
        if (error.response && status.value === 422) {
            errors.value = error.response.data.errors;
        }
        if(error.response.data.message){
          errors.value.common = error.response.data.message;
        }
    }  
    resetValue()
  };
  
  const handleActiveEvent = async (event) => {
    initValue()
    const { data: updatedEvent } = await activeEvent(event.id, {
      is_active: event.is_active
    })
    const currentEvent = events.value.find(item => item.id === event.id)
    currentEvent.is_active = updatedEvent.data.is_active
    resetValue()
  }
    
  const handleRemovedEvent = async (event) => {
    initValue()
    await removeEvent(event.id)
    const currentEvent = events.value.findIndex(item => item.id === event.id)
    events.value.splice(currentEvent, 1)
    fetchAllEvents('')
  }

  const handleExportEvent = async (form) => {
    initValue()
    try {
      await exportEvent(form).then((response) => {
        status.value = response.status;  
        eventFile.value = response.data.url;  
        errors.value.common = response.data.message;  
      });
    } catch (error) {
        if (error.response && error.response.status) {
            status.value = error.response.status
        }
        if (error.response && status.value === 422) {
            errors.value = error.response.data.errors;
        }
        if(error.response.data.message){
          errors.value.common = error.response.data.message;
        }
    }  
    resetValue()  
  };

  const handleImportEvent = async (form) => {
    initValue()
    try {
      await importEvent(form).then((response) => {
        status.value = response.status; 
        errors.value.common = response.data.message;  
      });
    } catch (error) {
        if (error.response && error.response.status) {
            status.value = error.response.status
        }
        if (error.response && status.value === 422) {
            errors.value = error.response.data.errors;
        }
        if(error.response.data.message){
          errors.value.common = error.response.data.message;
        }
    }  
    resetValue()  
  };

  const initValue = () => {
    isShowLoader.value = true;
    isApiCallComplete.value = false;
    errors.value = {};
    eventFile.value = {};
    calendarEvents.value = [];
    events.value = [];
  };

  const resetValue = () => {
    isShowLoader.value = false;
    isApiCallComplete.value = true;
  };
  
  const paginationPages = () => { 
    pages.value.length = 0;
    pages.value.push(startPage.value)
    if( ((currentPage.value - 1) > (startPage.value + 2)) && lastPage.value > 6){   
      pages.value.push('...')  
      startPageLink.value = ((currentPage.value - 1) < (lastPage.value - 4)) ? (currentPage.value - 1) : (lastPage.value - 4);
    } else {
        startPageLink.value = startPage.value+1;
    }
    if( ((currentPage.value + 1) < (lastPage.value - 2)) && lastPage.value > 6){  
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
    // isShowLoader.value = false;
    // isApiCallComplete.value = true;
  };

  const handleSort = (column) => {
    // isShowLoader.value = true;
    orderDir.value = orderDir.value * -1
    sortType.value = (orderDir.value === 1) ?'DESC' : 'ASC'
    orderColumn.value = column
    
    fetchAllEvents('')
  };

  const handleSearch = () => {    
    // isShowLoader.value = true;
    fetchAllEvents('')
  };

  const handlePerPage = (perpage) => { 
    // isShowLoader.value = true;   
    perPage.value = perpage
    currentPage.value = 1
    fetchAllEvents('')
  };

  const switchPage = (page) => {
      currentPage.value = page
      handleSearch()
  };

  const handlePrev = () => {
      if(startPage.value < currentPage.value){
          currentPage.value--
          handleSearch()
      }
  };

  const handleNext = () => {
      if(lastPage.value > currentPage.value){
          currentPage.value++
          handleSearch()
      }
  };

  const clearSearch = () => {
      filterName.value = ""
      handleSearch()
  };



  return {
    errors,
    errorsList,
    status,
    isSuccess,
    isApiCallComplete,
    isShowLoader,
    events,
    calendarEvents,
    event,
    eventFile,
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
    fetchCalendarEvents,
    handleSort,
    handleSearch,
    handlePerPage,
    switchPage,
    handlePrev,
    handleNext,
    handleCreateEvent,
    handleShowEvent,
    handleUpdateEvent,
    handleActiveEvent,
    handleRemovedEvent,
    handleImportEvent,
    handleExportEvent,
    clearSearch,
    paginationPages,
  };
},
{
  persist: true,
});