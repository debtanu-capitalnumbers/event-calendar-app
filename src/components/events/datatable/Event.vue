<template>    
    <tr>
        <td><img :src="imageUrl" alt="example placeholder" :style="{ 'max-width':'80px', 'max-height':'80px'}"/></td>
        <td>{{ event.title }}</td>
        <td>{{ event.event_start_date_time }}</td>
        <td>{{ event.event_end_date_time }}</td>
        <td>{{ event.location }}</td>
        <td>{{ event.event_category }}</td>
        <td>
            <img src="@/assets/active-removebg-preview.png" alt="logo" style="width: 100px;cursor: pointer;" @click="maskEventActive" v-if="event.is_active">
            <img src="@/assets/inactive-removebg-preview.png" alt="logo" style="width: 100px;cursor: pointer;" @click="maskEventActive" v-else>
        </td>
        <td style="width: 7%;">
            <router-link :to="{ name: 'editevent', params: { id: event.id } }" class="btn btn-edit  btn-sm me-1">
                <i class="fa-solid fa-pencil" style="color: #198754;"></i>
            </router-link>
            <a href="#" @click="removeTask" class="btn btn-delete  btn-sm ms-1">
                <i class="fa-solid fa-trash" style="color: #dc3545;"></i>
            </a>
        </td>
    </tr>
</template>
<style>
    .toggle:focus>.toggle-group>.toggle-handle, .toggle:hover>.toggle-group>.toggle-handle {
        opacity: unset !important;
    }
    .toggle {
        border-radius: 20px;
    }
    .toggle-handle {
        border-radius: unset;
    }
    .btn-edit {
        border-color: #198754;
    }
    .btn-edit:hover {
        border-color: #198754 !important;

    }
    .btn-delete {
        border-color: #dc3545;
    }
    .btn-delete:hover {
        border-color: #dc3545 !important;

    }
</style>
<script setup>
    import { computed } from "vue";
    import imagedefaultUrl from '../../../assets/image-placeholder.png';
    const props = defineProps({
        event: Object
    })

    const imageUrl = computed(
        () => {
            return (props.event.download_path !== null && props.event.download_path !== "") ? props.event.download_path : imagedefaultUrl
        }
    )
    const emit = defineEmits(['updated', 'activeted', 'removed'])
        
    const maskEventActive = event => {
        const updatedEvent = {
            ... props.event,
            is_active: !props.event.is_active
        }
        emit("activeted", updatedEvent)
    }
    const removeTask = () => {
        if(confirm("Are you sure?")){
            emit("removed", props.event)
        }
    }
</script>