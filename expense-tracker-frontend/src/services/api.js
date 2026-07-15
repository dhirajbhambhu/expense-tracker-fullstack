import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-fullstack-4-4u0k.onrender.com",
});

export default api;