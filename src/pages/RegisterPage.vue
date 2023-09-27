<template>
<main class="auth-wrapper">
    <form class="auth-form" @submit.prevent="handleSubmit">
        <h1>
            <span>ToeDoe</span>
            <strong>List</strong>
        </h1>
        <h2 class="h3 mb-4 fw-normal">Please sign up</h2>
        <div class="form-floating mb-2">
            <input type="text" class="form-control" :class="{ 'is-invalid': errors.username && errors.username[0] }" id="username" v-model="form.username" placeholder="Your name" />
            <label for="username">Username</label>
            <div class="invalid-feedback" v-if="errors.username && errors.username[0]">
                {{ errors.username && errors.username[0] }}
            </div>
        </div>
        <div class="form-floating mb-2">
            <input type="email" class="form-control" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
            <label for="email">Email</label>
            <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                {{ errors.email && errors.email[0] }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
            <label for="password">Password</label>
            <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                {{ errors.password && errors.password[0] }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation"
                placeholder="Password Confirmation" />
            <label for="password_confirmation">Password Confirmation</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        <div class="form-floating mb-3">
            <span>
                <a href="#" @click.prevent="$event => $router.push('/login')">Already have an account? Login</a>
            </span>
        </div>
    </form>
</main>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const router = useRouter()
const store = useAuthStore()
const { isLoggedIn, errors } = storeToRefs(store)
const { handleRegister } = store
const form = reactive({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
})

onMounted(async () => {
    errors.value = ''
})

const handleSubmit = async () => {
    errors.value = ''
    await handleRegister(form)
    if (isLoggedIn.value) {
        router.push({ name: 'events' })
    }
}
</script>