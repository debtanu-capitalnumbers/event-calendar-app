import api from "./api"
import http from "./http-api"
const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/auth"
export const csrfCookie = () => api.get('/sanctum/csrf-cookie')

export const login = (credentials) => api.post(`${resource}/login`, credentials)
export const forgotPassword = (credentials) => api.post(`${resource}/forgotPassword`, credentials)
export const resetPassword = (credentials) => api.post(`${resource}/resetPassword`, credentials)
export const register = (user) => api.post(`${resource}/register`, user)
export const logout = () => http.post(`${resource}/logout`)