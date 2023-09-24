<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h2 class="h3 mb-4 fw-normal">Login</h2>
            <div class="form-floating mb-2">
                <input type="username" class="form-control" :class="{ 'is-invalid': errors.credentials && errors.credentials[0] }" id="username" v-model="form.username" placeholder="name@example.com" />
                <label for="username">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" :class="{ 'is-invalid': errors.credentials && errors.credentials[0] }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">Password</label>
                <div class="invalid-feedback" v-if="errors.credentials && errors.credentials[0]">
                    {{ errors.credentials && errors.credentials[0] }}
                </div>
            </div>
            
            <button class="w-10 btn btn-lg btn-primary" type="submit">login</button>
            <div class="form-floating mb-3">
                <span>
                    <a href="#" @click.prevent="$event => $router.push('/register')">Don't have an account? Resister</a>
                </span>
            </div>
            <div class="form-floating mb-3">
                <span>
                    <a href="#" @click.prevent="$event => $router.push('/forgot-password')">Forgot password</a>
                </span>
            </div>
        </form>
    </main>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter()
const store = useAuthStore()
const { errors } = storeToRefs(store)
const { handleLogin } = store

const form = reactive({
    username: '',
    password: '' 
})
onMounted(async () => {
    errors.value = ''
})
const handleSubmit = async () => {
    errors.value = ''
    await handleLogin(form)
    router.push({ name: 'events' })
}
</script>