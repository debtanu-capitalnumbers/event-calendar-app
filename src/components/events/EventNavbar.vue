<template>    
    <div class="row">
        <div class="col-sm-3"><h4 class=" mt-2">Events</h4></div>
        <div class="col-sm-3"></div>
        <div class="col-sm-3"></div>
        <div class="col-sm-3">
            <router-link :to="{ name: 'createevent' }" >
                <button type="button" class="btn btn-warning btn-sm mt-2">Create Event</button>
            </router-link>
        </div>
    </div>
    <hr/>
</template>