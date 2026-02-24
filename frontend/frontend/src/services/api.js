import axios from "axios";

const API = axios.create({
  baseURL: "https://backendforbook-production.up.railway.app/api/bookmarks"
});

export default API;