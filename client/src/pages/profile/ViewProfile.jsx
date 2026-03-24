import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileByUser } from "../../services/profileService";
import FollowButton from "../../components/profile/FollowButton";

const ViewProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfileByUser(userId);
      setProfile(data);
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <p>Loading..</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={profile.user?.avatar || "https://i.pravatar.cc/150"}
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h2 className="text-xl text-(--color-primary)">
            {profile.user?.username}
          </h2>
          <p className="text-gray-500">{profile.user?.name}</p>
        </div>
      </div>

      <FollowButton targetUserId={profile.user._id} />

      <p>{profile.bio}</p>
      <p>
        <strong>Skills:</strong> {profile.skills}
      </p>
      <p>
        <strong>Company:</strong> {profile.company}
      </p>
      <p>
        <strong>Location:</strong> {profile.location}
      </p>
    </div>
  );
};

export default ViewProfile;
