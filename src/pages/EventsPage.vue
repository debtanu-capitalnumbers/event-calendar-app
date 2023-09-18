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
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
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
</style>
<script setup>
import { onMounted, computed, ref } from "vue";
import { useEventStore } from "../stores/event";

const store = useEventStore()
const { fetchAllEvents } = store


onMounted(async () => {
    await fetchAllEvents()
    console.log(store.events)
    console.log(store.activeEvents)
    console.log(store.events)
})
</script>