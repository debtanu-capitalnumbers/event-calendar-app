<template>    
    <div class="row">
        <div class="col-sm-4"><h4 class=" mt-2">Events</h4></div>
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4 text-end">
            <router-link :to="{ name: 'importevent' }" class="p-1">
                <button type="button" class="btn btn-warning btn-sm mt-2">Import event</button>
            </router-link>
            <router-link :to="{ name: 'exportevent' }" class="p-1">
                <button type="button" class="btn btn-warning btn-sm mt-2">Export event</button>
            </router-link>
            <router-link :to="{ name: 'createevent' }" class="p-1">
                <button type="button" class="btn btn-warning btn-sm mt-2">Create Event</button>
            </router-link>
        </div>
    </div>
    <hr/>
</template>