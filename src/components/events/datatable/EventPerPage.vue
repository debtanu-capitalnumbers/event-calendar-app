<template>    
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
    .dropdown-item {
        cursor: pointer;
    }
</style>
<script setup>
    import { storeToRefs } from 'pinia';
    import { useEventStore } from "../../../stores/event";

    const store = useEventStore()
    const { handlePerPage } = store
    const { perPage } = storeToRefs(store)
</script>