import axios from 'axios';
// import { useAuthStore } from "../stores/auth";

axios.defaults.withCredentials = true;

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});
// const store = useAuthStore();

// Add/Update token for each request
http.interceptors.request.use(    
    config => {
        // let authUser = store.token; 
        let authUser = localStorage.getItem("token"); 
        if (authUser) {
            config.headers.authorization = "Bearer " + authUser;
            config.headers.paths = window.location.href;
            config.headers.get["Accept"] = "*/*";
            config.headers.get["Content-Type"] = "application/zip; charset=utf-8";
            config.headers.responseType = 'arraybuffer';
            config.headers.get["Content-Disposition"] = "attachment";
            config.headers.responseType = 'blob';   
        }
        
        return config;
    },
    // Do something with request error
    error => {
        Promise.reject(error)}
);

export default http;