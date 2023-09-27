<template>
    <tr>
        <th @click="handleSort('title')" :class="[computeSortTypeClassForTitle, 'sort-control']">TITLE</th>
        <th @click="handleSort('event_start_date_time')" :class="[computeSortTypeClassForStartDate, 'sort-control']">START DATETIME</th>
        <th @click="handleSort('event_end_date_time')" :class="[computeSortTypeClassForEndDate, 'sort-control']">END DATETIME</th>
        <th @click="handleSort('location')" :class="[computeSortTypeClassForLocation, 'sort-control']">LOCATION</th>
        <th @click="handleSort('event_category')" :class="[computeSortTypeClassForCategory, 'sort-control']">EVENT CATEGORY</th>
        <th @click="handleSort('is_active')" :class="[computeSortTypeClassForStatus, 'sort-control']">STATUS</th>
        <th>ACTION</th>
    </tr>
</template>
<style scoped>
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
    import { computed } from "vue";
    import { storeToRefs } from 'pinia';
    import { useEventStore } from "../../../stores/event";

    const store = useEventStore()
    const { handleSort } = store
    const { orderColumn, orderDir } = storeToRefs(store)

    const computeSortTypeClassForTitle = computed(
        () => (orderColumn.value === 'title') ? ((orderDir.value === 1) ?'descending' : 'ascending') : ''
    )
    const computeSortTypeClassForStartDate = computed(
        () => (orderColumn.value === 'event_start_date_time') ? ((orderDir.value === 1) ?'descending' : 'ascending') : ''
    )
    const computeSortTypeClassForEndDate = computed(
        () => (orderColumn.value === 'event_end_date_time') ? ((orderDir.value === 1) ?'descending' : 'ascending') : ''
    )
    const computeSortTypeClassForLocation = computed(
        () => (orderColumn.value === 'location') ? ((orderDir.value === 1) ?'descending' : 'ascending') : ''
    )
    const computeSortTypeClassForCategory = computed(
        () => (orderColumn.value === 'event_category') ? ((orderDir.value === 1) ?'descending' : 'ascending') : ''
    )
    const computeSortTypeClassForStatus = computed(
        () => (orderColumn.value === 'is_active') ? ((orderDir.value === 1) ?'descending' : 'ascending') : ''
    )
</script>