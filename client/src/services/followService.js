import API from "../api/axios";

const followUser = async (id) => {
  const res = await API.post(`/users/follow/${id}`);
  return res.data;
};

const unfollowUser = async (id) => {
  const res = await API.post(`/users/unfollow/${id}`);
  return res.data;
};

const getFollowers = async (id) => {
  const res = await API.get(`/users/${id}/followers`);
  return res.data;
};

const getFollowing = async (id) => {
  const res = await API.get(`/users/${id}/following`);
  return res.data;
};

export { followUser, unfollowUser, getFollowers, getFollowing };
