import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser, forgotPassword, resetPassword } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null);
    const token = ref(null);
    const errors = ref({});
    const message = ref(null);
    const status = ref(200);

    const isLoggedIn = computed(() => !!user.value);
  
    const fetchUser = async () => {
        try {
            const { data } = await getUser();
            user.value = data;       
        } catch (error) {
            status.value = error.response.status;
            user.value = null;
        }
    };

    const handleLogin = async (credentials) => {
        errors.value = {};
        await csrfCookie();
        try {
            await login(credentials).then((response) => {
                status.value = response.status;
                message.value = response.data.message;
                token.value = response.data.token;
                localStorage.setItem('token', token.value);        
            });
            await fetchUser();
        } catch (error) {
            if (error.response && error.response.status) {
                status.value = error.response.status
                errors.value.common = error.response.message;
            }
            if (error.response && status.value === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const handleForgotPassword = async (credentials) => {
        errors.value = {};
        await csrfCookie();
        try {
            await forgotPassword(credentials).then((response) => {
                status.value = response.status;
                message.value = response.data.message;
            });
        } catch (error) {
            if (error.response && error.response.status) {
                status.value = error.response.status
                errors.value.common = error.response.message;
            }
            if (error.response && status.value === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const handleResetPassword = async (credentials) => {
        errors.value = {};
        await csrfCookie();
        try {
            await resetPassword(credentials).then((response) => {
                status.value = response.status;
                message.value = response.data.message;
            });
        } catch (error) {
            if (error.response && error.response.status) {
                status.value = error.response.status
                errors.value.common = error.response.message;
            }
            if (error.response && status.value === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const handleRegister = async (newUser) => {
        errors.value = {};
        try {
            await register(newUser);
            await handleLogin({
                username: newUser.username,
                password: newUser.password,
            }).then((response) => {
                status.value = response.status;
                message.value = response.data.message;
            });
        } catch (error) {
            if (error.response && error.response.status) {
                status.value = error.response.status
                errors.value.common = error.response.message;
            }
            if (error.response && status.value === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const handleLogout = async () => {
        await logout();
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');     
        localStorage.removeItem('eventStore');        
    };

    return {
        user,
        token,
        errors,
        message,
        status,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleForgotPassword,
        handleResetPassword,
        handleRegister,
        handleLogout,
    };
},
{
  persist: true,
});
