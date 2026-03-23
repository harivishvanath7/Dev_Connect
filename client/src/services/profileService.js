import API from "../api/axios";

const createProfile = async (data) => {
  const res = await API.post("/profile", data);
  return res.data;
};

const updateProfile = async (data) => {
  const res = await API.put("/profile", data);
  return res.data;
};

const getProfiles = async () => {
  const res = await API.get("/profile");
  return res.data;
};

const getProfileByUser = async (userId) => {
  const res = await API.get(`/profile/${userId}`);
  return res.data;
};

const searchProfiles = async (skill) => {
  const res = await API.get(`/profile/search/skill?skill=${skill}`);
  return res.data;
};

export {
  createProfile,
  updateProfile,
  getProfiles,
  getProfileByUser,
  searchProfiles,
};
