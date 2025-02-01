import { auth, provider, db } from "../utils/firebase";
import google from "../assets/google.png";
import { signInWithPopup, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { logIn } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { setUserDetails } from "../redux/postSlice";

const GoogleSignIn = () => {
  const [progress, setProgress] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setProgress(true);
      const user: User = result.user;

      // User data to store in firestore
      const userData = {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
        bio: "",
        coverImg: "",
      };

      //check if user already exists
      const userRef = doc(db, "users", user?.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // if user doesn't exists store user data
        await setDoc(userRef, userData);
      } else {
        const existingUserData = userSnap.data();
        userData.name = existingUserData.name;
        userData.photoUrl = existingUserData.photoUrl;
        userData.bio = existingUserData.bio;
        userData.coverImg = existingUserData.coverImg;
        console.log(existingUserData);
      }
      dispatch(logIn(userData));
      dispatch(
        setUserDetails({
          uid: userData.uid,
          userName: userData.name || "",
          userProfilePicture: userData.photoUrl || "",
        })
      );
      navigate("/home");
      setProgress(false);
    } catch (error) {
      console.error("Error during Google sign-in : ", error);
    }
  };
  return (
    <div
      onClick={handleGoogleSignIn}
      className="bg-darkGray rounded-full w-[240px] cursor-pointer p-4 flex items-center justify-center gap-3 text-lightGrayBg"
    >
      {progress ? (
        <CircularProgress color="inherit" size={24} />
      ) : (
        <>
          <img src={google} alt="Google Logo" />
          <span className="text-white font-Karla font-bold">
            Continue with Google
          </span>
        </>
      )}
    </div>
  );
};

export default GoogleSignIn;
