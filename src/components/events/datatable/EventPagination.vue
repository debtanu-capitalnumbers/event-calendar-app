<template>
    <div class="row px-3">
        <div class="col-sm-4 col-md-4">
            <span class="justify-content-left">Showing {{startingShowingRecord}} to {{endingShowingRecord}} of {{totalRecord}} entries</span>
        </div>
        <div class="col-sm-4 col-md-8">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: isFirstPage}"><a class="page-link" href="#" @click.prevent="handlePrev">Previous</a></li>
                <li class="page-item" :class="{ active: nowCurrentPage === page }" v-for="(page, index) in pages" :key="index">
                    <a v-if=" page !== '...'" class="page-link" href="#" @click.prevent="switchPage(page)">{{ page }}</a>                    
                    <a v-else class="page-link" >{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: isLastPage}"><a class="page-link" href="#" @click.prevent="handleNext">Next</a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .page-link:focus{
        box-shadow: none !important;
    }
    .page-link:hover{
        background-color: white !important;
    }
</style>
<script setup>
    import { computed } from "vue";
    import { storeToRefs } from 'pinia';
    import { useEventStore } from "../../../stores/event";

    const store = useEventStore()
    const { handleNext, handlePrev, switchPage } = store
    const { isApiCallComplete, pages, startPage, currentPage, lastPage, perPage, totalRecord, nowCurrentPage } = storeToRefs(store)

    const isFirstPage = computed(
        () => (startPage.value === currentPage.value) ? true : false
    )
    const isLastPage = computed(
        () => (lastPage.value === currentPage.value) ? true : false
    )
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
                    return 0;
                }
            } else {
                return endingShowingRecord.value
            }
        }
    )
</script>