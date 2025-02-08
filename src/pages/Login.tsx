import React, { useEffect } from "react";
import logo from "../assets/app_logo.png";
import bg from "../assets/splash-screen-bg.png";
import GoogleSignIn from "../components/GoogleSignIn";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  return (
    <section className="w-full h-full relative">
      <img src={bg} className="h-[85vh] w-full rounded-t-xl" alt="background" />
      <div className="rounded-b-xl bg-white h-[35%] md:h-[30%] xl:h-[35%]  absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center px-3 py-10 rounded-t-[63px] shadow-2xl">
        <div className="flex flex-col items-center gap-2 mb-7">
          <div className="flex items-center gap-2">
            <img src={logo} alt="app-logo" />
            <p className="font-Karla text-[24px] md:text-[28px] font-semibold">
              Postify
            </p>
          </div>
          <p className="font-KSans md:text-lg">
            Moments That Matter, Shared Forever.
          </p>
        </div>
        <GoogleSignIn />
      </div>
    </section>
  );
};

export default Login;
