 <template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3"><h4 class=" mt-2">Events</h4></div>
            <div class="col-sm-3"></div>
            <div class="col-sm-3"></div>
            <div class="col-sm-3"><button type="button" class="btn btn-warning btn-sm mt-2">Create Event</button></div>
        </div>
        <hr/>
        
        <div class="row mb-3">  
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-text dropdown-text">Show</span>
                    <div class="dropdown">
                        <button type="button" class="btn btn-outline-dark dropdown-toggle btnhvr" data-bs-toggle="dropdown">10</button>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">10</a></li>
                        <li><a class="dropdown-item" href="#">20</a></li>
                        <li><a class="dropdown-item" href="#">30</a></li>
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
                            <input type="text" class="form-control" placeholder="Search...">
                            </div>
                            <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button"><i class="fas fa-sync-alt"></i></button>
                            <button class="btn btn-outline-secondary" type="button"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th @click="handleSort('name')" :class="[(orderColumn === 'name')? sortTypeClass : '', 'sort-control']">TITLE</th>
                            <th @click="handleSort('event_start_date_time')" :class="[(orderColumn === 'event_start_date_time')? sortTypeClass : '', 'sort-control']">START DATETIME</th>
                            <th @click="handleSort('event_end_date_time')" :class="[(orderColumn === 'event_end_date_time')? sortTypeClass : '', 'sort-control']">END DATETIME</th>
                            <th @click="handleSort('location')" :class="[(orderColumn === 'location')? sortTypeClass : '', 'sort-control']">LOCATION</th>
                            <th @click="handleSort('event_category')" :class="[(orderColumn === 'event_category')? sortTypeClass : '', 'sort-control']">EVENT CATEGORY</th>
                            <th @click="handleSort('is_active')" :class="[(orderColumn === 'is_active')? sortTypeClass : '', 'sort-control']">STATUS</th>
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
                            <td>{{ event.is_active }}</td>
                            <td>{{ event.id }}</td>
                        </tr>
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination justify-content-center">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div> 
    </div>
</template>
<style scoped>
 .dropdown-text {
    background-color: white;
    padding-right: 10%;
    border: none;
}
.btnhvr:hover {
    color: black  !important;
    background-color: white  !important;
    border-color: black  !important;
}
.sort-control {
    cursor: pointer;
}
.ascending:after {
    content: "\25b2";
}
.descending:after {
    content: "\25bc";
}
</style>
<script setup>
import { onMounted, computed, ref } from "vue";
import { useEventStore } from "../stores/event";

const store = useEventStore()
const { fetchAllEvents } = store

const events = ref([])
const orderDir = ref(1)
const orderColumn = ref('name')
const orderClass = ref('sort-control')
const sortTypeClass = ref('descending')
const sortType = ref('DESC')


onMounted(async () => {
    let params = `?page=1`
    params = params + `&per_page=10`
    params = params + `&sort_by=`+sortType.value
    params = params + `&sort_field_name=`+orderColumn.value
    events.value = null
    await fetchAllEvents(params)
    events.value = store.events
})


const handleSort = async (column) => {
    orderDir.value = orderDir.value * -1;
    orderColumn.value = column;
    orderClass.value = 'sort-control '+sortType.value;
    sortTypeClass.value =  (orderDir.value === 1) ? 'ascending' : 'descending'
    sortType.value =  (orderDir.value === 1) ? 'ASC' : 'DESC'
    
    let params = `?page=1`
    params = params + `&per_page=10`
    params = params + `&sort_by=`+sortType.value
    params = params + `&sort_field_name=`+orderColumn.value
    events.value = null
    await fetchAllEvents(params)
    events.value = store.events
}
</script>