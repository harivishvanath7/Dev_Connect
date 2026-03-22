import API from "../api/axios";

const registerUser = async (formData) => {
    const res = await API.post("/auth/register", formData);
    return res.data;
}

const loginUser = async (formData) => {
    const res = await API.post("/auth/login", formData);
    return res.data;
}

export { registerUser, loginUser };