<template>
    <div class="row px-3">
        <div class="col-sm-4 col-md-4">
            <span class="justify-content-left">Showing {{startingShowingRecord}} to {{endingShowingRecord}} of {{totalRecord}} entries</span>
        </div>
        <div class="col-sm-4 col-md-8">
            <paginate   :page-count=lastPage    :click-handler="clickCallback"></paginate>
        </div>
    </div>
</template>

<style>
    .page-item:focus{
        box-shadow: none !important;
    }
    .page-item{
        cursor: pointer !important;
    }
    .page-item:hover{
        background-color: white !important;
    }
</style>
<script setup>
    import { computed } from "vue";
    import { storeToRefs } from 'pinia';
    import { useEventStore } from "../../../stores/event";
    import Paginate from "vuejs-paginate-next";

    const store = useEventStore()
    const { handleSearch } = store
    const { isApiCallComplete, currentPage, lastPage, perPage, totalRecord } = storeToRefs(store)
    
    const clickCallback = async (pageNum) => {
        currentPage.value = pageNum
        await handleSearch()
    }
    const startingShowingRecord  = computed(
        () => {
            if(isApiCallComplete.value === true){
                if(((( currentPage.value -1 ) * perPage.value) + 1) <= totalRecord.value){
                    return (( currentPage.value -1 ) * perPage.value) + 1
                } else {
                    return 0;
                }
            } else {
                return startingShowingRecord.value
            }
        }
    )
    const endingShowingRecord = computed(
        () => {
            if(isApiCallComplete.value){
                if((currentPage.value * perPage.value) <= totalRecord.value){
                    return currentPage.value * perPage.value
                } else {
                    return totalRecord.value;
                }
            } else {
                return endingShowingRecord.value
            }
        }
    )
</script>