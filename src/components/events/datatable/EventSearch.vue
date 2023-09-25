<template>    
    <div class="input-group">
        <div class="form-outline">
        <input type="text" v-model="filterName" class="form-control" placeholder="Search...">
        </div>
        <div class="input-group-append">
        <button class="btn btn-outline-secondary" v-show="computeWhenSearching" @click="clearSearch" type="button"><i class="fas fa-sync-alt"></i></button>
        <button class="btn btn-outline-secondary" v-show="computeWhenSearching" @click="handleSearch" type="button"><i class="fas fa-search"></i></button>
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { storeToRefs } from 'pinia';
import { useEventStore } from "../../../stores/event";

const store = useEventStore()
const { clearSearch, handleSearch } = store
const { filterName } = storeToRefs(store)

const computeWhenSearching = computed(
    () => filterName.value.length > 2
)
</script>