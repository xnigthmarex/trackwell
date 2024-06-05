"use client"
import React, { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const Header = (props: any) => {
  const { size } = useThree();
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  const tabsPosition = {
    top: -size.height / 2,
    left: -size.width / 2,
  };


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    const result = await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <Html style={{ position: "absolute", ...tabsPosition, color: "white" }}>
      <div className="w-screen font-mono ">
        <div className="absolute grid grid-cols-3 w-screen pb-.5 lg:pb-1 border-b-2 border-blue-400">
          <h1 className="text-sm lg:text-3xl col-start-1 flex items-center justify-start text-text-blue-200 ml-3 glow-text font-extrabold">
            <img className="w-12 h-10 mr-2  rounded-lg" src="/logo.jpg" alt="logo" />
            TRACKWELL
          </h1>
          <h1 className="text-sm lg:text-3xl col-start-2 flex items-center justify-center mt-1 glow-text font-semibold ">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </h1>
          <div className="col-start-3 flex items-center justify-end text-blue-200 glow-text font-semibold">
            <h1 className="text-3sm lg:text-3xl">
              Welcome {props?.props?.user?.name}
            </h1>
            <button className=" text-xs lg:text-lg ml-0 p-0 lg:ml-1 lg:p-1.5 rounded-md bg-red-500" onClick={handleSignOut}>
              SignOut
            </button>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default Header;
