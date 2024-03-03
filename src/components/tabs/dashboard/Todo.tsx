import React, {useRef} from 'react';
import {createTodo ,getTodos} from "./ServerActions";

export default function Todo(props:any) {
    const inputRef = useRef<HTMLInputElement>(null);
    const addTodo = () => {
        if (inputRef.current) {
            if(inputRef.current.value === ""){
                alert("Please enter a task");
            }else{
                createTodo({
                    content: inputRef.current.value,
                    userId: props.props.user.id
                });
                inputRef.current.value = "";
            }
        }
        
    };
    return (
        <div className="grid place-items-center">
            <h1 className="glow-text text-3xl">Todo</h1>
            <div className="mt-4">
                <input type="text" placeholder="Enter your task..." className="px-4 py-2 mr-2 border-2  border-purple-500 rounded bg-inherit font-extrabold placeholder-gray-200 flash-purple" ref={inputRef} />
                <button className="px-4 py-2 border-2 font-extrabold text-white rounded border-green-700 flash-green" onClick = {addTodo}>Add</button>
            </div>
        </div>
    );
}
