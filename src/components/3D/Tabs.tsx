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
        top: -size.height / 1.82,
        left: -size.width / 2,
    };

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    console.log(props.props);

    return (
        <Html className="pt-24" style={{ position: "absolute", ...tabsPosition, color: "white" }}>
            <div className="w-screen">
                <div className="absolute grid grid-cols-4 w-screen border-b-2 border-blue-400 mb-4">
                <button className={`text-xs lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "Dashboard" ? "flash-red" : ""} `} onClick={() => handleTabClick("Dashboard")}>Dashboard</button>
                <button className={`text-xs lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "Journal" ? "flash-red" : ""} `} onClick={() => handleTabClick("Journal")}>Journal</button>
                <button className={`text-xs lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "Pomodoro" ? "flash-red" : ""} `} onClick={() => handleTabClick("Pomodoro")}>Pomodoro</button>
                <button className={`text-xs lg:text-xl bg-inherit text-white glow-text font-extrabold ${activeTab === "TedEd" ? "flash-red" : ""} `} onClick={() => handleTabClick("TedEd")}>TedEd</button>
 
                </div>
                <div className = "pt-8">
                {activeTab === "Dashboard" && <Dashboard props ={props?.props} />}
                {activeTab === "Journal" && <Journal props = {props?.props}/>}
                {activeTab === "Pomodoro" && <Pomodoro/>}
                {activeTab === "TedEd" && <TedEd/>}
                </div>
                
            </div>
        </Html>
    );
}
