import React, { useState, useEffect } from 'react';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateProfileApi } from '../services/api';

function Profile() {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({ username: "", github: "", linkedin: "", profile: "" });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setProfileData({
        username: sessionStorage.getItem('user') || "",
        github: sessionStorage.getItem('github') || "",
        linkedin: sessionStorage.getItem('linkedin') || "",
        profile: sessionStorage.getItem('profile') || ""
      });
    }
  }, []);

  useEffect(() => {
    if (profileData.profile && profileData.profile.type) {
      const url = URL.createObjectURL(profileData.profile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(profileData.profile ? `${base_url}/uploads/${profileData.profile}` : "https://via.placeholder.com/150");
    }
  }, [profileData.profile]);

  const handleUpdate = async () => {
    setLoading(true);
    const { username, github, linkedin, profile } = profileData;
    if (!username || !github || !linkedin || !profile) {
      toast.warning("Enter valid inputs");
      setLoading(false);
      return;
    }
    if (profile.type && !['image/jpg', 'image/jpeg', 'image/png'].includes(profile.type)) {
      toast.warning("Only JPG, JPEG, or PNG images allowed");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("github", github);
      formData.append("linkedin", linkedin);
      if (profile.type) formData.append("profile", profile);

      const result = await updateProfileApi(formData);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('github', github);
        sessionStorage.setItem('linkedin', linkedin);
        sessionStorage.setItem('profile', result.data.profile || profile);
        setOpen(false);
      } else {
        toast.error(result.data?.message || "Update failed");
      }
    } catch (error) {
      toast.error(!error.response ? "Network error occurred" : error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-3">
      <div className="d-flex justify-content-between">
        <h2 >Your Profile</h2>
        <button className="btn bg-info" onClick={() => setOpen(!open)}>
          {open ? <i className="fa-solid fa-up-long text-dark"></i> : <i className="fa-solid fa-down-long text-dark"></i>}
        </button>
      </div>
      {open && (
        <div>
          <label htmlFor="profileInput">
            <input type="file" id="profileInput" style={{ display: 'none' }} onChange={(e) => setProfileData({ ...profileData, profile: e.target.files[0] })} />
            <img
              src={preview}
              alt="profile"
              className="img-fluid mx-5"
            />
          </label>
          <input type="text" value={profileData.username} onChange={(e) => setProfileData({ ...profileData, username: e.target.value })} placeholder="Enter username" className="form-control mb-3" />
          <input type="text" value={profileData.github} onChange={(e) => setProfileData({ ...profileData, github: e.target.value })} placeholder="Enter GitHub URL" className="form-control mb-3" />
          <input type="text" value={profileData.linkedin} onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })} placeholder="Enter LinkedIn URL" className="form-control mb-3" />
          <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={handleUpdate} disabled={loading}>Save</button>
            <button className="btn btn-outline-dark" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;