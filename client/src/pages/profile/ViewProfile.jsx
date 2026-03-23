import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileByUser } from "../../services/profileService";

const ViewProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetch = async () => {
        const data = await getProfileByUser(userId);
        setProfile(data);
    };
    fetch();
  }, [userId]);

  if(!profile) return <p>Loading..</p>

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl text-(--color-primary)">
        {profile.user?.name}
      </h2>

      <p>{profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills}</p>
      <p><strong>Company:</strong> {profile.company}</p>
      <p><strong>Location:</strong> {profile.location}</p>
    </div>
  );
};

export default ViewProfile;
