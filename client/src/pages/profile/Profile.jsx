import { useEffect, useState } from "react";
import {
  createProfile,
  getProfileByUser,
  updateProfile,
} from "../../services/profileService";

const Profile = () => {
  const [form, setForm] = useState({
    bio: "",
    skills: "",
    company: "",
    location: "",
    website: "",
    github: "",
  });

  // State for editing
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProfile = async () => {
    if (!user?.user?.id) return;
    
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
      let data;

      if (isEditing) {
        data = await updateProfile(form);
      } else {
        data = await createProfile(form);
      }

      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (profile && !isEditing) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl text-(--color-primary)">{profile.user?.name}</h2>

        <p>{profile.bio}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Company:</strong> {profile.company}</p>
        <p><strong>Location:</strong> {profile.location}</p>

        <button
          onClick={() => {
            setIsEditing(true);
            setForm({
              bio: profile.bio || "",
              skills: profile.skills || "",
              company: profile.company || "",
              location: profile.location || "",
              website: profile.website || "",
              github: profile.github || "",
            }); // preload form
          }}
          className="mt-4 bg-(--color-secondary) px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-(--color-primary)">Create Profile</h2>

      <input
        name="bio"
        placeholder="Bio"
        value={form.bio}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="skills"
        placeholder="Skills (comma seperated)"
        value={form.skills}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
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
