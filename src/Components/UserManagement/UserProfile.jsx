import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
  const [name, setName] = useState(user.name);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");

  const updateProfile = () => {
    const updatedUser = { ...user, name, profilePic };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    alert("Profile Updated!");
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Profile Picture URL" onChange={(e) => setProfilePic(e.target.value)} />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
};

export default UserProfile;
