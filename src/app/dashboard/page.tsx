"use server"
import Experience  from "@/components/3D/Experience";

export default async function Home() {
    
    return (
        <main className="bg-black h-screen w-screen">
                <Experience/>
        </main>
    );
}
