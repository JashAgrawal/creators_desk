import React, { useState } from "react";
import bg from "@/assets/bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { authenticateUser, GoogleSignIn } from "@/services/firebase";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { error } from "console";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = async () => {
    if (!isLogin) {
      if (password !== confirmPassword) {
        toast("Passwords do not match");
        return;
      }
    }
    try {
      const user = await authenticateUser(email, password, isLogin);
      console.log(user);
      toast((isLogin ? "Login" : "Signup") + " Success");
    } catch (error: any) {
      const message = "" + error.message;
      const code = error;
      console.log(code);
      toast(message.split("auth/")[1].split(")")[0], {
        description: message.split(":")[1],
      });
    }
  };
  const handleGoogle = async () => {
    try {
      const user = await GoogleSignIn();
      console.log(user);
      toast((isLogin ? "Login" : "Signup") + " Success");
    } catch (error: any) {
      const message = "" + error.message;
      const code = error;
      console.log(code);
      toast(message.split("auth/")[1].split(")")[0], {
        description: message.split(":")[1],
      });
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center bg-black overflow-hidden">
      <img
        src={bg}
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10 opacity-30 object-cover"
      />
      <div className="w-1/3 p-6 bg-white rounded-md flex flex-col justify-center items-center space-y-4 shadow-lg z-20">
        <h1 className="font-bold text-xl px-6 pb-2 border-b text-gray-600">
          {isLogin ? "Login" : "Signup"} to Creators Deck
        </h1>
        <div
          onClick={() => handleGoogle()}
          className="w-full flex justify-center items-center space-x-4 shadow-md p-2 px-4 border border-gray-300 rounded-md z-10"
        >
          <FcGoogle size={24} />
          <p className="font-semibold">Continue with Google</p>
        </div>
        <div className="flex space-x-2 items-center w-full">
          <div className="w-full h-1 border-b" />
          <p className="text-gray-500 text-sm">Or</p>
          <div className="w-full h-1 border-b" />
        </div>
        <Input
          placeholder="email@emsail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <Input
            placeholder="Retype Password ..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button onClick={handleClick} className="w-full">
          Continue
        </Button>
        <div className="py-2">
          <div onClick={() => setIsLogin(!isLogin)}>
            <p className="text-blue-500 w-full text-center hover:underline">
              {isLogin
                ? "Don't Have an Account ? Sign Up Here"
                : "Already have an account ? Sign In Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
