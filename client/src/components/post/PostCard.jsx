import { likePost, addComment } from "../../services/postService";
import { useState } from "react";

function PostCard({ post, refresh }) {
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await likePost(post._id);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      await addComment(post._id, comment);
      setComment("");
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      
      <h3 className="font-semibold text-(--color-primary)">
        {post.user?.name}
      </h3>

      <p className="my-2">{post.text}</p>

      <div className="flex gap-4 text-sm mb-2">
        <button onClick={handleLike}>
          ❤️ {post.likes.length}
        </button>
        <span>💬 {post.comments.length}</span>
      </div>

      {/* COMMENTS */}
      <div className="mb-2">
        {post.comments.map((c, i) => (
          <p key={i} className="text-sm">
            <strong>{c.user?.name}:</strong> {c.text}
          </p>
        ))}
      </div>

      {/* ADD COMMENT */}
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border p-2 rounded text-sm"
        />
      </form>
    </div>
  );
}

export default PostCard;