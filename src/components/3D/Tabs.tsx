"use client"

import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Dashboard from "@/components/tabs/dashboard/Dashboard";
import Journal from "@/components/tabs/journal/Journal";
import Pomodoro from "@/components/tabs/pomodoro/Pomodoro";
import TedEd from "@/components/tabs/ted/Ted";

export default function Tabs(props:any) {
    const { size } = useThree();
    const [activeTab, setActiveTab] = useState("Dashboard"); // Initial active tab

    const tabsPosition = {
        top: -size.height / 2,
        left: -size.width / 2,
    };

    // Function to handle tab click
    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    return (
        <Html className="mt-12" style={{ position: "absolute", ...tabsPosition, color: "white" }}>
            <div className="h-screen w-full ">
                <div className="absolute grid grid-cols-4 w-screen border-b-2 border-blue-400 mb-2">
                <button className={`text-sm lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "Dashboard" ? "flash-red" : ""} `} onClick={() => handleTabClick("Dashboard")}>Dashboard</button>
                <button className={`text-sm lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "Journal" ? "flash-red" : ""} `} onClick={() => handleTabClick("Journal")}>Journal</button>
                <button className={`text-sm lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "Pomodoro" ? "flash-red" : ""} `} onClick={() => handleTabClick("Pomodoro")}>Pomodoro</button>
                <button className={`text-sm lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "TedEd" ? "flash-red" : ""} `} onClick={() => handleTabClick("TedEd")}>TedEd</button>
 
                </div>
                <div className = "py-8">
                {activeTab === "Dashboard" && <Dashboard props ={props?.props} />}
                {activeTab === "Journal" && <Journal />}
                {activeTab === "Pomodoro" && <Pomodoro/>}
                {activeTab === "TedEd" && <TedEd/>}
                </div>
                
            </div>
        </Html>
    );
}
