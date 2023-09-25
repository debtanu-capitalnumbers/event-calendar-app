<template>    
    <tr>
        <td>{{ event.name }}</td>
        <td>{{ event.event_start_date_time }}</td>
        <td>{{ event.event_end_date_time }}</td>
        <td>{{ event.location }}</td>
        <td>{{ event.event_category }}</td>
        <td>
            <button type="button" class="btn btn-success" v-if="event.is_active" @click="maskEventActive">Active</button>
            <button type="button" class="btn btn-danger" v-else @click="maskEventActive">Inactive</button>
        </td>
        <td>{{ event.id }}</td>
    </tr>
</template>

<script setup>
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