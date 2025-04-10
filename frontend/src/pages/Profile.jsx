import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setImage(URL.createObjectURL(file));
    updateProfile(file); 
  };
  
  return (
    
    <div className="h-full w-screen flex flex-col justify-center items-center bg-blue-900 text-white">
      <h2 className="text-3xl font-bold mb-2">PROFILE</h2>
      <p className="text-md text-gray-300 mb-6">Your Profile Information</p>

      <div className="flex flex-col items-center  p-6 rounded-xl ">
        <div className="relative">
          <img
            src={image || authUser?.ProfilePic || "/images/IMAGE.png"}
            alt="Profile"
            className="w-[200px] h-[200px] object-cover rounded-full border-4 border-white"
          />

          <label
            htmlFor="AvatarUpload"
            className={`absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition 
            ${isUpdatingProfile ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            <Camera className="h-6 w-6 text-white" />
            <input
              type="file"
              id="AvatarUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>

        <div className="mt-4 text-center">
          <div className="flex flex-col m-3">
            <p className="p-2 text-xl font-bold">NAME</p>
            <h3 className="h-[40px] w-[400px] rounded-xl border-2 border-blue-600 font-serif p-2 font-bold">
              {authUser?.fullName || "John Doe"}
            </h3>
          </div>
          <div className="flex flex-col m-3">
            <p className="p-2 text-xl font-bold">EMAIL</p>
            <h3 className="h-[40px] w-[400px] rounded-xl border-2 border-blue-600 font-serif p-2 font-bold">
              {authUser?.email || "John@gmail.com"}
            </h3>
          </div>
        </div>

        <div className="mt-4 text-2xl font-bold h-[40px] w-[200px] bg-blue-600 text-white flex justify-center items-center rounded-xl cursor-pointer">
          {isUpdatingProfile ? "Updating Profile..." : "Update Profile"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
