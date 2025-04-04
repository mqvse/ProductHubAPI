// src/pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
        setUsername(res.data.username);
        setProfileImage(res.data.profile_image || '');
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/auth/me', { username, profile_image: profileImage });
      setUser((prev) => ({ ...prev, username, profile_image: profileImage }));
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-card">
        <img
          src={user.profile_image || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <label>Name:</label>
          <p>{user.name}</p>
          <label>Email:</label>
          <p>{user.email}</p>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Profile Image URL:</label>
          <input
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
          <button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
