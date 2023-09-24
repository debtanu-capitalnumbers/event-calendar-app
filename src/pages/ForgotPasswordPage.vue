<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h2 class="h3 mb-4 fw-normal">Forgot Password</h2>
            <div class="alert alert-success" v-show="isSuccess">
                <strong>Success!</strong> {{ message }}
            </div>            
            <div class="form-floating mb-3">
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="email" />
                <label for="email">Email</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            
            <button class="w-10 btn btn-lg btn-primary" type="submit">Reset Password</button>
            <div class="form-floating mb-3">
                <span>
                    <a href="#" @click.prevent="$event => $router.push('/login')">Remember your password? Login</a>
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
const { isLoggedIn, errors, message, status } = storeToRefs(store)
const { handleForgotPassword } = store

const isSuccess = computed(
    () => (status.value === 200 || status.value === 201 || status.value === 202) ? true : false
)

const form = reactive({
    email: ''
})
onMounted(async () => {
    errors.value = ''
    message.value = ''
    status.value = ''
    if (isLoggedIn.value) {
        router.push({ name: 'events' })
    }
})
const handleSubmit = async () => {
    errors.value = ''
    message.value = ''
    status.value = ''
    await handleForgotPassword(form)
}
</script>