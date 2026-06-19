import axios from "axios";

const api = axios.create({
 baseURL: "https://transguard-ai-backend.onrender.com/api",
});

export default api;