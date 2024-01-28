<template>
<main class="auth-wrapper">
    <form class="auth-form" @submit.prevent="handleSubmit">
        <h1>
            <span>ToeDoe</span>
            <strong>List</strong>
        </h1>
        <h2 class="h3 mb-4 fw-normal">Please sign up</h2>
        <div class="form-floating mb-2">
            <input type="text" class="form-control" @blur="validateData('username')" :class="{ 'is-invalid': errors.username && errors.username[0] }" id="username" v-model="form.username" placeholder="Your name" />
            <label for="username">Username</label>
            <div class="invalid-feedback" v-if="errors.username && errors.username[0]">
                {{ errors.username && errors.username[0] }}
            </div>
        </div>
        <div class="form-floating mb-2">
            <input type="email" class="form-control" @blur="validateData('email')" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
            <label for="email">Email</label>
            <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                {{ errors.email && errors.email[0] }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" @blur="validateData('password')" :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
            <label for="password">Password</label>
            <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                {{ errors.password && errors.password[0] }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="password_confirmation" @blur="validateData('password_confirmation')" v-model="form.password_confirmation"
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
    import { onMounted, ref ,reactive, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useAuthStore } from "../stores/auth";
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers, email, sameAs } from '@vuelidate/validators';

    const router = useRouter()
    const store = useAuthStore()
    const { isLoggedIn } = storeToRefs(store)
    const { handleRegister } = store
    const errors = ref({})
    const form = reactive({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const rules = computed(() => { 
        return {
            username: { required: helpers.withMessage('USsername is required', required) },
            email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Email must be a proper email format', email) },
            password: { required: helpers.withMessage('Password is required', required) },
            confirm_password: { required: helpers.withMessage('Confirm Password is required', required), sameAsPassword: sameAs('password') },
        };      
    });
    const v$ = useVuelidate(rules, form);

    const validateData = async (field) => {
        errors.value = {};
        let errorCount = 0;
        let notifyError = '';
        let result = true;
        if(field !== 'value'){
            result = await v$.value[field].$validate();
        } else {
            result = await v$.value.$validate();
        }
        v$.value.$errors.forEach((element, index) => {
            if(index == 0){
                notifyError = element.$message;
            }
            errors.value[element.$property] = [element.$message];
            errorCount++;
        });
        
        if(errorCount >= 2){
            notifyError += ' (and ' + (-- errorCount) + ' more errors)';
        }
        if(notifyError !== ""){
            notify({
                title: notifyError,
                type: 'error',
            });
        }
        return result;
    }

    onMounted(async () => {
    })

    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){ 
            await handleRegister(form)
            if (isLoggedIn.value) {
                router.push({ name: 'events' })
            }
        }
    }
</script>