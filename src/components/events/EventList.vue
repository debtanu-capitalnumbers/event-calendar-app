<template>
    <div class="row mb-3">  
        <div class="col-md-3">
            <div class="input-group">
                <span class="input-group-text dropdown-text">Show</span>
                <div class="dropdown">
                    <button type="button" class="btn btn-outline-dark dropdown-toggle btnhvr" data-bs-toggle="dropdown">{{ perPage }}</button>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click.prevent="handlePerPage('10')">10</a></li>
                    <li><a class="dropdown-item" @click.prevent="handlePerPage('20')">20</a></li>
                    <li><a class="dropdown-item" @click.prevent="handlePerPage('30')">30</a></li>
                    </ul>
                </div>
                <span class="input-group-text dropdown-text">entries</span>
            </div>      
        </div>
        <div class="col-md-9">
            <div class="form-inline d-flex justify-content-end">
                <div class="form-group">
                    <div class="input-group">
                        <div class="form-outline">
                        <input type="text" v-model="filterName" class="form-control" placeholder="Search...">
                        </div>
                        <div class="input-group-append">
                        <button class="btn btn-outline-secondary" v-show="computeWhenSearching" @click="clearSearch" type="button"><i class="fas fa-sync-alt"></i></button>
                        <button class="btn btn-outline-secondary" v-show="computeWhenSearching" @click="handleSearch" type="button"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th @click="handleSort('name')" :class="[computeSortTypeClassForName, 'sort-control']">TITLE</th>
                        <th @click="handleSort('event_start_date_time')" :class="[computeSortTypeClassForStartDate, 'sort-control']">START DATETIME</th>
                        <th @click="handleSort('event_end_date_time')" :class="[computeSortTypeClassForEndDate, 'sort-control']">END DATETIME</th>
                        <th @click="handleSort('location')" :class="[computeSortTypeClassForLocation, 'sort-control']">LOCATION</th>
                        <th @click="handleSort('event_category')" :class="[computeSortTypeClassForCategory, 'sort-control']">EVENT CATEGORY</th>
                        <th @click="handleSort('is_active')" :class="[computeSortTypeClassForStatus, 'sort-control']">STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" :key="event.id">
                        <td>{{ event.name }}</td>
                        <td>{{ event.event_start_date_time }}</td>
                        <td>{{ event.event_end_date_time }}</td>
                        <td>{{ event.location }}</td>
                        <td>{{ event.event_category }}</td>
                        <td>
                            <button type="button" class="btn btn-success" v-if="event.is_active" @click="handleActive(false, event.id)">Active</button>
                            <button type="button" class="btn btn-danger" v-else @click="handleActive(true, event.id)">Inactive</button>
                        </td>
                        <td>{{ event.id }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="row px-3">
                <div class="col-sm-4 col-md-4">
                    <span class="justify-content-left">Showing {{startingShowingRecord}} to {{endingShowingRecord}} of {{totalRecord}} entries</span>
                </div>
                <div class="col-sm-4 col-md-8">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: isFirstPage}"><a class="page-link" href="#" @click.prevent="prev">Previous</a></li>

                        <li class="page-item" :class="{ active: nowCurrentPage === page }" v-for="(page, index) in pages" :key="index">
                            <a v-if=" page !== '...'" class="page-link" href="#" @click.prevent="switchPage(page)">{{ page }}</a>
                            
                            <a v-else class="page-link" >{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: isLastPage}"><a class="page-link" href="#" @click.prevent="next">Next</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from 'pinia';
import { useEventStore } from "../../stores/event";

const store = useEventStore()
const { fetchAllEvents } = store
const { startPage, currentPage, endPage, orderDir, perPage, filterName, orderColumn, sortType, totalRecord } = storeToRefs(store)
defineProps({
    events: Array,
    show: {
        type: Boolean,
        default: true
    }
})

const pages = ref([])
const startPageLink = ref(1)
const endPageLink = ref(1)
const nowCurrentPage = ref(1)
const orderClass = ref('sort-control')

const computeWhenSearching = computed(
    () => filterName.value.length > 2
)
const computeSortTypeClassForName = computed(
    () => (orderColumn.value === 'name') ? ((orderDir.value === 1) ?'ascending' : 'descending') : ''
)
const computeSortTypeClassForStartDate = computed(
    () => (orderColumn.value === 'event_start_date_time') ? ((orderDir.value === 1) ?'ascending' : 'descending') : ''
)
const computeSortTypeClassForEndDate = computed(
    () => (orderColumn.value === 'event_end_date_time') ? ((orderDir.value === 1) ?'ascending' : 'descending') : ''
)
const computeSortTypeClassForLocation = computed(
    () => (orderColumn.value === 'location') ? ((orderDir.value === 1) ?'ascending' : 'descending') : ''
)
const computeSortTypeClassForCategory = computed(
    () => (orderColumn.value === 'event_category') ? ((orderDir.value === 1) ?'ascending' : 'descending') : ''
)
const computeSortTypeClassForStatus = computed(
    () => (orderColumn.value === 'is_active') ? ((orderDir.value === 1) ?'ascending' : 'descending') : ''
)
const isFirstPage = computed(
    () => (startPage.value === currentPage.value) ? true : false
)
const isLastPage = computed(
    () => (endPage.value === currentPage.value) ? true : false
)
const startingShowingRecord  = computed(
    () => {
        if(((( currentPage.value -1 ) * perPage.value) + 1) <= totalRecord.value){
            return (( currentPage.value -1 ) * perPage.value) + 1
        } else {
            return 0;
        }
    }
)
const endingShowingRecord = computed(
    () => {
        if((currentPage.value * perPage.value) <= totalRecord.value){
            return currentPage.value * perPage.value
        } else {
            return 0;
        }
    }
)

onMounted(async () => {
    // params['page']  = currentPage.value
    // params['per_page']  = perPage.value
    // params['sort_by']  = sortType.value
    // params['sort_field_name']  = orderColumn.value
    // params['search']  = filterName.value
    // let params = `?page=`+currentPage.value
    // params = params + `&per_page=`+perPage.value
    // params = params + `&sort_by=`+sortType.value
    // params = params + `&sort_field_name=`+orderColumn.value
    // params = params + `&search=`+filterName.value
    // await fetchAllEvents(params)
    const setPageLink = paginationPages()
})

const handleSort = async (column) => {
    orderDir.value = orderDir.value * -1
    orderColumn.value = column
    orderClass.value = 'sort-control '+sortType.value
    
    let params = `?page=`+currentPage.value
    params = params + `&per_page=`+perPage.value
    params = params + `&sort_by=`+sortType.value
    params = params + `&sort_field_name=`+orderColumn.value
    params = params + `&search=`+filterName.value
    await fetchAllEvents(params)
    const setPageLink = paginationPages()
}

const handleSearch = async () => {    
    let params = `?page=`+currentPage.value
    params = params + `&per_page=`+perPage.value
    params = params + `&sort_by=`+sortType.value
    params = params + `&sort_field_name=`+orderColumn.value
    params = params + `&search=`+filterName.value
    await fetchAllEvents(params)
    const setPageLink = paginationPages()
}

const handlePerPage = async (perpage) => {    
    perPage.value = perpage
    currentPage.value = 1
    let params = `?page=`+currentPage.value
    params = params + `&per_page=`+perPage.value
    params = params + `&sort_by=`+sortType.value
    params = params + `&sort_field_name=`+orderColumn.value
    params = params + `&search=`+filterName.value
    await fetchAllEvents(params)
    const setPageLink = paginationPages()
}

const handleActive = async (status, id) => {   
    console.log(status); 
    console.log(id); 
}


const paginationPages = () => { 
    pages.value.length = 0;
    pages.value.push(startPage.value)
    if( ((currentPage.value - 1) > (startPage.value + 2)) && endPage.value > 5){   
      pages.value.push('...')  
      startPageLink.value = ((currentPage.value - 1) < (endPage.value - 4)) ? (currentPage.value - 1) : (endPage.value - 4);
    } else {
        startPageLink.value = startPage.value+1;
    }
    if( ((currentPage.value + 1) < (endPage.value - 2)) && endPage.value > 5){  
        endPageLink.value = ((currentPage.value + 1) > (startPage.value + 4)) ? (currentPage.value + 1) : (startPage.value + 4);
        for (let index = startPageLink.value; index <= endPageLink.value; index++) {
          pages.value.push(index)
        }
        pages.value.push('...')
    } else { 
        endPageLink.value = endPage.value - 1;
        for (let index = startPageLink.value; index <= endPageLink.value; index++) {
          pages.value.push(index)
        }
    }
    if(startPage.value !== endPage.value){
        pages.value.push(endPage.value)
    }
    nowCurrentPage.value = currentPage.value
}

const switchPage = (page) => {
    currentPage.value = page
    const setNewSearch = handleSearch()
}
const prev = () => {
    if(startPage.value < currentPage.value){
        currentPage.value--
        const setNewSearch = handleSearch()
    }
}
const next = () => {
    if(endPage.value > currentPage.value){
        currentPage.value++
        const setNewSearch = handleSearch()
    }
}

const clearSearch = () => {
    filterName.value = ""
}
</script>