import API from "../utils/axios";

// data -> request body JSON

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

