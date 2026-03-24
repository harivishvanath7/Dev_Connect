import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../../services/profileService";
import defaultimg from "../../assets/default-user.svg";

const Developers = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProfiles();
      setProfiles(data);
    };
    fetch();
  }, []);
  return (
    <div>
      <h2 className="text-xl mb-4 text-(--color-primary)">Developers</h2>

      {profiles.map((dev) => (
        <div
          key={dev._id}
          className="bg-white p-4 rounded shadow mb-3 flex items-center gap-4"
        >
          {/* Avatar */}
          <img
            src={dev.user?.avatar || defaultimg}
            className="w-12 h-12 rounded-full"
          />

          <div className="flex-1">
            {/* Username + Name */}
            <h3 className="font-semibold">{dev.user?.username}</h3>
            <p className="text-sm text-gray-500">{dev.user?.name}</p>

            <p>{dev.bio}</p>

            <Link
              to={`/profile/${dev.user._id}`}
              className="text-(--color-secondary)"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Developers;
