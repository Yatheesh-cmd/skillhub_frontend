import React, { useState, useEffect } from 'react';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateProfileApi, getProfileApi } from '../services/api';

function Profile() {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({ username: "", github: "", linkedin: "", profile: "" });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileApi();
        if (response.status === 200) {
          const { username, github, linkedin, profile } = response.data;
          setProfileData({ username, github, linkedin, profile });
          // Update sessionStorage to keep it in sync
          sessionStorage.setItem('user', username);
          sessionStorage.setItem('github', github || '');
          sessionStorage.setItem('linkedin', linkedin || '');
          sessionStorage.setItem('profile', profile || '');
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch profile data");
      }
    };

    if (sessionStorage.getItem('token')) {
      fetchProfile();
    }
  }, []);

  useEffect(() => {
    if (profileData.profile && typeof profileData.profile === 'object' && profileData.profile.type) {
      // Handle file object for preview during upload
      const url = URL.createObjectURL(profileData.profile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      // Handle server-stored image or default
      setPreview(
        profileData.profile
          ? `${base_url}/uploads/${profileData.profile}`
          : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
      );
    }
  }, [profileData.profile]);

  const handleUpdate = async () => {
    setLoading(true);
    const { username, github, linkedin, profile } = profileData;
    if (!username) {
      toast.warning("Username is required");
      setLoading(false);
      return;
    }
    if (profile && typeof profile === 'object' && !['image/jpg', 'image/jpeg', 'image/png'].includes(profile.type)) {
      toast.warning("Please upload JPG, JPEG, or PNG images only");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("github", github || "");
      formData.append("linkedin", linkedin || "");
      if (profile && typeof profile === 'object') {
        formData.append("profile", profile);
      }

      const result = await updateProfileApi(formData);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        const updatedUser = result.data.user;
        // Update state and sessionStorage
        setProfileData({
          username: updatedUser.username,
          github: updatedUser.github || "",
          linkedin: updatedUser.linkedin || "",
          profile: updatedUser.profile || ""
        });
        sessionStorage.setItem('user', updatedUser.username);
        sessionStorage.setItem('github', updatedUser.github || '');
        sessionStorage.setItem('linkedin', updatedUser.linkedin || '');
        sessionStorage.setItem('profile', updatedUser.profile || '');
        setOpen(false);
      } else {
        toast.error(result.data?.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0 text-dark">Your Profile</h2>
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={() => setOpen(!open)}
          aria-label={open ? "Collapse profile form" : "Expand profile form"}
        >
          {open ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      </div>
      {open && (
        <div className="mt-4">
          <div className="text-center mb-4">
            <label htmlFor="profileInput" className="cursor-pointer">
              <div className="position-relative d-inline-block">
                <img
                  src={preview}
                  alt="Profile"
                  className="rounded-circle img-fluid"
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    border: '2px solid #e9ecef'
                  }}
                />
                <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2">
                  <i className="fa-solid fa-camera text-white"></i>
                </div>
              </div>
              <input
                type="file"
                id="profileInput"
                accept="image/*"
                className="d-none"
                onChange={(e) => setProfileData({ ...profileData, profile: e.target.files[0] })}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
              placeholder="Enter username"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="github" className="form-label">GitHub URL</label>
            <input
              type="url"
              id="github"
              value={profileData.github}
              onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
              placeholder="Enter GitHub URL"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
            <input
              type="url"
              id="linkedin"
              value={profileData.linkedin}
              onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
              placeholder="Enter LinkedIn URL"
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-info"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;