import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Sélectionne un avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
          <img src="loader.gif" alt="loader" className="max-w-full" />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
          <div className="title-container">
            <h1 className="text-white">
              Pick an Avatar as your profile picture
            </h1>
          </div>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index
                    ? "border-4 border-[#4e0eff]"
                    : "border-4 border-transparent"
                } p-4 rounded-full flex justify-center items-center transition duration-500 ease-in-out`}
                key={avatar}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  className="h-24 transition duration-500 ease-in-out"
                />
              </div>
            ))}
          </div>
          <button
            onClick={setProfilePicture}
            className="bg-[#4e0eff] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#4e0eff]"
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
