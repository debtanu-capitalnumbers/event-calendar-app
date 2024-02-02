import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allEvents, allCalendarEvents, activeEvent, removeEvent, createEvent, updateEvent, showEvent, exportEvent, importEvent } from "../http/event-api";
import { notify } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export const useEventStore = defineStore("eventStore", () => {
  const events = ref([])
  const calendarEvents = ref([])
  const event = ref({})
  const eventFile = ref({})
  const currentPage = ref(1)
  const startPage = ref(1)
  const lastPage = ref(1)
  const totalRecord = ref(0)
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
  const router = useRouter();

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
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
    }
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
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
    }
    resetValue()
  };

  const handleCreateEvent = async (form) => {
    initValue()
    try {
      await createEvent(form).then((response) => {
        status.value = response.status;  
        if(status.value === 200 || status.value === 201){                
            router.push({ name: 'events' })
        }
      });
    } catch (error) {
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
    }  
    resetValue()  
  };

  const handleUpdateEvent = async (id, form) => {
    initValue()
    try {
      await updateEvent(id, form).then((response) => {
        status.value = response.status;
        if(status.value === 200 || status.value === 201){                
            router.push({ name: 'events' })
        }  
      });
    } catch (error) {
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
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
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
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
        notify({ title: response.data.message, type: 'success' }); 
      });
    } catch (error) {
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
    }  
    resetValue()  
  };

  const handleImportEvent = async (form) => {
    initValue()
    try {
      await importEvent(form).then((response) => {
        status.value = response.status; 
        notify({ title: response.data.message, type: 'success' });  
      });
    } catch (error) {
      status.value = error.response.status
      notify({ title: error.response.data.message, type: 'error' });
    }  
    resetValue()  
  };

  const initValue = () => {
    isShowLoader.value = true;
    isApiCallComplete.value = false;
    eventFile.value = {};
    calendarEvents.value = [];
    events.value = [];
  };

  const resetValue = () => {
    isShowLoader.value = false;
    isApiCallComplete.value = true;
  };
  
  

  const handleSort = (column) => {
    // isShowLoader.value = true;
    orderDir.value = orderDir.value * -1
    sortType.value = (orderDir.value === 1) ?'DESC' : 'ASC'
    orderColumn.value = column
    
    fetchAllEvents('')
  };

  const handleSearch = async () => {    
    // isShowLoader.value = true;
    fetchAllEvents('')
  };

  const handlePerPage = (perpage) => { 
    // isShowLoader.value = true;   
    perPage.value = perpage
    currentPage.value = 1
    fetchAllEvents('')
  };  

  const clearSearch = () => {
      filterName.value = ""
      handleSearch()
  };



  return {
    status,
    isSuccess,
    isApiCallComplete,
    isShowLoader,
    events,
    calendarEvents,
    event,
    eventFile,
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
    handleCreateEvent,
    handleShowEvent,
    handleUpdateEvent,
    handleActiveEvent,
    handleRemovedEvent,
    handleImportEvent,
    handleExportEvent,
    clearSearch,
  };
},
{
  persist: true,
});