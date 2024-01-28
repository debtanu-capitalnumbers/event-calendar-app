import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, forgotPassword, resetPassword } from "../http/auth-api";
import { notify } from "@kyvg/vue3-notification";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null);
    const token = ref(null);
    const status = ref(200);

    const isLoggedIn = computed(() => !!user.value);
  
    const handleLogin = async (credentials) => {
        await csrfCookie();
        try {
            await login(credentials).then((response) => {
                token.value = response.data.token;
                user.value = response.data.user;
                status.value = response.status;
                notify({ title: response.data.message, type: 'success' });
                localStorage.setItem('token', token.value);        
            });
        } catch (error) {
            status.value = error.response.status
            notify({ title: error.response.data.message, type: 'error' });
        }
    };

    const handleForgotPassword = async (credentials) => {
        await csrfCookie();
        try {
            await forgotPassword(credentials).then((response) => {
                status.value = response.status;
                notify({ title: response.data.message, type: 'success' });
            });
        } catch (error) {
            status.value = error.response.status
            notify({ title: error.response.data.message, type: 'error' });
        }
    };

    const handleResetPassword = async (credentials) => {
        await csrfCookie();
        try {
            await resetPassword(credentials).then((response) => {
                status.value = response.status;
                notify({ title: response.data.message, type: 'success' });
            });
        } catch (error) {
            status.value = error.response.status
            notify({ title: error.response.data.message, type: 'error' });
        }
    };

    const handleRegister = async (newUser) => {
        try {
            await register(newUser);
            await handleLogin({
                username: newUser.username,
                password: newUser.password,
            }).then((response) => {
                status.value = response.status;
                notify({ title: response.data.message, type: 'success' });
            });
        } catch (error) {
            status.value = error.response.status
            notify({ title: error.response.data.message, type: 'error' });
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
        status,
        isLoggedIn,
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
