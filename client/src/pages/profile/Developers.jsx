import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../../services/profileService";

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
        <div key={dev._id} className="bg-white p-4 rounded shadow mb-3">
          <h3 className="font-semibold">{dev.user?.name}</h3>
          <p>{dev.bio}</p>

          <Link
            to={`/profile/${dev.user._id}`}
            className="text-(--color-secondary)"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Developers;
