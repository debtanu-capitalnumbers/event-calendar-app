<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h2 class="h3 mb-4 fw-normal">Forgot Password</h2>
            <div class="alert alert-success" v-show="isSuccess">
                <strong>Success!</strong> {{ message }}
            </div>            
            <div class="form-floating mb-3">
                <input type="text" class="form-control" @blur="validateData('email')" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="email" />
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
    import { onMounted, ref ,reactive, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useAuthStore } from "../stores/auth";
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers, email } from '@vuelidate/validators';

    const router = useRouter()
    const store = useAuthStore()
    const { isLoggedIn, status } = storeToRefs(store)
    const { handleForgotPassword } = store
    const errors = ref({})

    const isSuccess = computed(
        () => (status.value === 200 || status.value === 201 || status.value === 202) ? true : false
    )

    const form = reactive({
        email: ''
    })
    const rules = computed(() => { 
        return {
            email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Email must be a proper email format', email) },
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
        if (isLoggedIn.value) {
            router.push({ name: 'events' })
        }
    })
    const handleSubmit = async () => {
        const result = await validateData('value');
        if( result ){ 
            await handleForgotPassword(form)
        }
    }
</script>