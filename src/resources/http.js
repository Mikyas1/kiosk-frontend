import axios from "axios";

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: "http://localhost:8080/kiosk/ws",
    headers: {},
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    withCredentials: true,
});

try {
    http.interceptors.request.use(
        config => {
            let data = JSON.parse(localStorage.getItem("kiosk"));

            if (data && data.auth.token) {
                config.headers["Authorization"] = 'Bearer ' + data.auth.token;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
} catch (error) {
    console.log(error);
}

export default http;