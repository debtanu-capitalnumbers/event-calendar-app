<template>    
    <div class="row">
        <div class="col-sm-2"><h4 class=" mt-2">Events</h4></div>
        <div class="col-sm-2">
            <router-link :to="{ name: 'importeventcsv' }" >
                <button type="button" class="btn btn-warning btn-sm mt-2">Import event from CSV</button>
            </router-link>
        </div>
        <div class="col-sm-2">
            <router-link :to="{ name: 'importeventics' }" >
                <button type="button" class="btn btn-warning btn-sm mt-2">Import event from ICS</button>
            </router-link>
        </div>
        <div class="col-sm-2">
            <router-link :to="{ name: 'exporteventcsv' }" >
                <button type="button" class="btn btn-warning btn-sm mt-2">Export event from CSV</button>
            </router-link>
        </div>
        <div class="col-sm-2">
            <router-link :to="{ name: 'exporteventics' }" >
                <button type="button" class="btn btn-warning btn-sm mt-2">Export event from ICS</button>
            </router-link>
        </div>
        <div class="col-sm-2">
            <router-link :to="{ name: 'createevent' }" >
                <button type="button" class="btn btn-warning btn-sm mt-2">Create Event</button>
            </router-link>
        </div>
    </div>
    <hr/>
</template>