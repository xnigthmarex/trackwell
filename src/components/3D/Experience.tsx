"use client"
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Space from "./models/space.jsx";
import { LoadingScreen } from "./Loading";
import * as THREE from "three";
import Header from "./Header";
import Tabs from "./Tabs";
import {useSession} from "next-auth/react";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
    const [started, setStarted] = useState(false);
    const { data: session } = useSession();
    return (
        <>
        <LoadingScreen started={started} setStarted={setStarted} />
        <Canvas camera={{ fov: 50, position: [-2, 0, 4] }}>
            <Header props={session} />
            <Tabs props={session}/>
          <Space />
          {/* <OrbitControls></OrbitControls> */}
        </Canvas>

        </>
    );
    }