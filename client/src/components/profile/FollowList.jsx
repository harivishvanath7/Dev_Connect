import { useEffect, useState } from "react";
import { getFollowers, getFollowing } from "../../services/followService";

const FollowList = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [tab, setTab] = useState("followers");

  useEffect(() => {
    const fetchData = async () => {
      const followersData = await getFollowers(userId);
      const followingData = await getFollowing(userId);

      setFollowers(followersData);
      setFollowing(followingData);
    };

    fetchData();
  }, [userId]);

  const list = tab === "followers" ? followers : following;

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setTab("followers")}
          className={`px-3 py-1 rounded ${
            tab === "followers" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Followers
        </button>

        <button
          onClick={() => setTab("following")}
          className={`px-3 py-1 rounded ${
            tab === "following" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Following
        </button>
      </div>

      {list.length === 0 ? (
  <p className="text-gray-500">No users found</p>
) : (
  list.map((user) => (
    <div
      key={user._id}
      className="flex items-center gap-3 border-b py-2"
    >
      <img
        src={user.avatar || "/default-avatar.png"}
        alt="User"
        className="w-10 h-10 rounded-full"
      />

      <div>
        <h4 className="font-semibold">{user.username}</h4>
        <p className="text-sm text-gray-500">{user.bio}</p>
      </div>
    </div>
  ))
)}
    </div>
  );
};

export default FollowList;
