<template>
    <div class="container py-5">
        <h1>404</h1>
        <p>Sorry, the page <code>{{ $route.params.notFound }}</code> you're looking for is not found.</p>
        <router-link :to="{ name: 'events' }">Back to your events</router-link>
    </div>
</template>