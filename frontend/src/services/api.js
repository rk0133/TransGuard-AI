import axios from "axios";

const api = axios.create({
  baseURL: "https://transguard-ai-api.onrender.com/api",
});

export default api;