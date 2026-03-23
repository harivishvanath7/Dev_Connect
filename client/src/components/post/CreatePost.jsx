import { useState } from "react";
import { createPost } from "../../services/postService";

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await createPost({ text });
      setText("");
      onPostCreated();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-4"
    >
      <textarea
        placeholder="Share Something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
      />
      <button className="bg-(--color-primary) text-white px-4 py-2 rounded">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
