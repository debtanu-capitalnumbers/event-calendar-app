<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h2 class="h3 mb-4 fw-normal">Login</h2>
            <div class="form-floating mb-2">
                <input type="username" class="form-control" @blur="validateData('username')" :class="{ 'is-invalid': ((errors.credentials && errors.credentials[0]) || (errors.username && errors.username[0])) }" id="username" v-model="form.username" placeholder="name@example.com" />
                <label for="username">Username</label>
                <div class="invalid-feedback" v-if="((errors.credentials && errors.credentials[0]) || (errors.username && errors.username[0]))">
                    {{ ((errors.credentials && errors.credentials[0]) || (errors.username && errors.username[0])) }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" @blur="validateData('password')" :class="{ 'is-invalid': ((errors.credentials && errors.credentials[0]) || (errors.password && errors.password[0])) }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">Password</label>
                <div class="invalid-feedback" v-if="((errors.credentials && errors.credentials[0]) || (errors.password && errors.password[0]))">
                    {{ ((errors.credentials && errors.credentials[0]) || (errors.password && errors.password[0])) }}
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
    import { onMounted, ref ,reactive, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useAuthStore } from "../stores/auth";
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers } from '@vuelidate/validators';

    const router = useRouter()
    const store = useAuthStore()
    const { handleLogin } = store
    const errors = ref({})

    const form = reactive({
        username: '',
        password: '' 
    })
    const rules = computed(() => { 
        return {
            username: { required: helpers.withMessage('Username is required', required) },
            password: { required: helpers.withMessage('Password is required', required) },
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
            await handleLogin(form)
            router.push({ name: 'events' })
        }
    }
</script>