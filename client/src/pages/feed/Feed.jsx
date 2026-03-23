import { useEffect, useState } from "react";
import CreatePost from "../../components/post/CreatePost";
import PostCard from "../../components/post/PostCard";
import { getPosts } from "../../services/postService";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-(--color-background) p-4">
      <div className="max-w-xl mx-auto">
        <CreatePost onPostCreated={fetchPosts} />

        {posts.map((post) => (
          <PostCard key={post._id} post={post} refresh={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
