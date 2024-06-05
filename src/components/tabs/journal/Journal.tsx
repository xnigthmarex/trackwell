import { FaSearch } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import {useEffect, useState}  from "react";
import {create_journal, get_journals} from "./ServerActions";
import React from "react";

export default function Journal(props:any) {
    const user = props?.props?.user;
    
    useEffect(() => {
        get_journals(user);
    }, []);

    return (
        <div className="grid grid-cols-4 h-[92vh] p-1.5 ">
            <div className="col-start-1 flex justify-center p-1 ">
                <div className="w-full break-words rounded-2xl p-1 bg-black bg-opacity-30">
                    <Search />
                </div>
            </div>
            <div className="m-1 col-start-2 col-span-3  border-2 rounded-2xl border-blue-400 bg-black bg-opacity-50">
                
            </div>
        </div>
    );
}

function Search(){

    const inputRef = React.createRef<HTMLInputElement>();
    
    const addJournal = () => {
        if (inputRef.current) {
            const inputValue = inputRef.current.value.trim();
            if (inputValue === "") {
                alert("Please enter a task");
                return;
            }
            
            
        }
    };

    return (
        <div className="grid grid-cols-[73%_auto_auto] gap-2 items-center pr-2">
        <input type="text" placeholder="Search/Add Journal..." className="px-4 py-3.5 border-2 border-purple-500 rounded-xl bg-inherit font-extrabold placeholder-gray-200 flash-purple w-full" ref ={inputRef} />
        <button className="bg-inherit border-2 border-blue-500 text-white rounded-xl p-3.5 flash-blue"><FaSearch size={24}></FaSearch></button>
        <button className="bg-inherit border-2 border-green-500 text-white rounded-xl p-2 flash-green"><MdAdd size={36}></MdAdd></button>
      
      </div>
      
    )
}



function List_Journals(){
    
}
