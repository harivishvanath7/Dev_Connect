import API from "../api/axios";

const getPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

const createPost = async (data) => {
  const res = await API.post("/posts", data);
  return res.data;
};

const likePost = async (id) => {
  const res = await API.post(`/posts/like/${id}`);
  return res.data;
};

const addComment = async (id, text) => {
  const res = await API.post(`/posts/comment/${id}`, { text });
  return res.data;
};

const getFeed = async () => {
  const res = await API.get("/api/posts/feed");
  return res.data;
}

export { createPost, getPosts, likePost, addComment, getFeed };
