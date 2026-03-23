import { useEffect, useState } from "react";
import { createProfile, getProfileByUser } from "../../services/profileService";

const Profile = () => {
  const [form, setForm] = useState({
    bio: "",
    skills: "",
    company: "",
    location: "",
    website: "",
    github: "",
  });

  const [profile, setProfile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProfile = async () => {
    try {
      const data = await getProfileByUser(user?.user?.id);
      setProfile(data);
    } catch (error) {
      console.log(error || "No profile yet");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createProfile(form);
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (profile) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl text-(--color-primary)">{profile.user?.name}</h2>

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
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-(--color-primary)">Create Profile</h2>

      <input
        name="bio"
        placeholder="Bio"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="skills"
        placeholder="Skills (comma seperated)"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="company"
        placeholder="Company"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />

      <button className="bg-(--color-primary) text-white px-4 py-2">
        Save Profile
      </button>
    </form>
  );
};

export default Profile;
