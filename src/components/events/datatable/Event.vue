<template>    
    <tr>
        <td>{{ event.title }}</td>
        <td>{{ event.event_start_date_time }}</td>
        <td>{{ event.event_end_date_time }}</td>
        <td>{{ event.location }}</td>
        <td>{{ event.event_category }}</td>
        <td>
            <input type="checkbox" name="is_active" checked v-if="event.is_active" @change="maskEventActive" data-toggle="toggle" data-onlabel="Active" data-offlabel="Inactive" data-onstyle="success" data-offstyle="danger">
            <input type="checkbox" name="is_active" v-else @change="maskEventActive" data-toggle="toggle" data-onlabel="Active" data-offlabel="Inactive" data-onstyle="success" data-offstyle="danger">
        </td>
        <td style="width: 7%;">
            <a href="#" class="btn btn-edit  btn-sm me-1">
                <i class="fa-solid fa-pencil" style="color: #198754;"></i>
            </a>
            <a href="#" class="btn btn-delete  btn-sm ms-1">
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
    const props = defineProps({
        event: Object
    })
    const emit = defineEmits(['updated', 'activeted', 'removed'])
        
    const maskEventActive = event => {
        const updatedEvent = {
            ... props.event,
            is_active: !props.event.is_active
        }
        emit("activeted", updatedEvent)
    }
</script>