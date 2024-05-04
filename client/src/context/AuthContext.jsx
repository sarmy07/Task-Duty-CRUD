import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token")) || null;
  });

  const navigate = useNavigate();

  const signInUser = async (formdata, props) => {
    try {
      const { data } = await axiosInstance.post("/auth/signin", formdata);
      console.log(data);
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      toast.success("You are now Logged In!");
      props.onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async (formdata, props) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", formdata);
      console.log(data);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      props.onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/");
  };

  const contextData = {
    token,
    user,
    signInUser,
    signUpUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
