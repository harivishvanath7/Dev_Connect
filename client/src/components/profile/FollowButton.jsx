import { useEffect, useState } from "react";
import {
  followUser,
  getFollowing,
  unfollowUser,
} from "../../services/followService";

const FollowButton = ({ targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?.user?.id || user?.id;

  const checkFollowing = async () => {
    try {
      const following = await getFollowing(currentUserId);
      const exists = following?.find((u) => u._id === targetUserId);
      setIsFollowing(!!exists);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkFollowing();
  }, [targetUserId]);

  const handleClick = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId);
      } else {
        await followUser(targetUserId);
      }

      checkFollowing(); 
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUserId === targetUserId) return null;

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded ${isFollowing ? "bg-gray-400" : "bg-(--color-primary) text-white"}`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
