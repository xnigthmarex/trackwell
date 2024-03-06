import React, { useRef, useState, useEffect } from 'react';
import { createTodo, getTodos, deleteTodo, toggleTodo } from "./ServerActions";
import { SpinningCircles ,ThreeDots} from 'react-loading-icons'
import { FaTrashAlt } from "react-icons/fa";

interface Todo {
    id: string; // Change the type of id to string
    content: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
}

interface Props {
    user: { id: string } | undefined; // Define the user prop type
}

export default function Todo(props: any) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [addingTodo, setAddingTodo] = useState(false);

    

    useEffect(() => {
        
            setLoading(true); 
            getTodos(props.props.user.id)
                .then((result: Todo[]) => {
                    setTodos(result);
                })
                .catch(error => {
                    console.error("Error fetching todos:", error);
                })
                .finally(() => {
                    setLoading(false); 
                });
        
    }, [props.props.user]);

    

    const addTodo = () => {
        if (inputRef.current) {
            const inputValue = inputRef.current.value.trim();
            if (inputValue === "") {
                alert("Please enter a task");
                return;
            }
            setAddingTodo(true);
            setLoading(true); // Set loading to true when adding a new todo
            createTodo({
                content: inputValue,
                userId: props.props.user!.id
            }).then((newTodo) => {
                setTodos(prevTodos => [...prevTodos, newTodo]);
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            }).catch(error => {
                console.error("Error adding todo:", error);
            }).finally(() => {
                setLoading(false); // Set loading to false after adding the new todo
                setAddingTodo(false);
            });
        }
    };

    const handleDeleteTodo = (todoId: string) => { // Update parameter type to string
        setLoading(true); // Set loading to true when deleting a todo
        deleteTodo(todoId).then(() => {
            getTodos(props.props.user!.id).then((result: Todo[]) => {
                setTodos(result);
                setLoading(false); // Set loading to false after deleting
            });
        });
    };

    const handleToggleTodo = (todoId: string) => { // Update parameter type to string
        setLoading(true); // Set loading to true when toggling a todo
        toggleTodo(todoId).then(() => {
            getTodos(props.props.user!.id).then((result: Todo[]) => {
                setTodos(result);
                setLoading(false); // Set loading to false after toggling
            });
        });
    };

    return (
        <div className="w-full">
            <h1 className="glow-text text-2xl lg:text-3xl flex items-center justify-center">Todo</h1>
            <div className="mt-4  ml-7 lg:ml-10 flex items-center justify-start lg:justify-center">
                <input type="text" placeholder="Enter your task..." className=" px-4 py-2 mr-2 border-2 border-purple-500 rounded bg-inherit font-extrabold placeholder-gray-200 flash-purple" ref={inputRef} />
                <button className="px-4 py-2 border-2 font-extrabold text-white rounded glow-text border-green-700 flash-green" onClick={addTodo} disabled={addingTodo}>
                    {addingTodo ? <ThreeDots className ="w-6 h-[1.3rem] text-white glow-text"></ThreeDots> : 'Add'}
                </button>
            </div>
            <div className="mt-4 mx-12">
                {loading ? (
                    <SpinningCircles className="w-20 h-20 text-white glow-text"></SpinningCircles>
                ) : (
                    todos.map((todo: Todo) => (
                        <div key={todo.id} className="flex items-center justify-between px-4 py-1.5 border-2 border-orange-800 rounded mt-2 flash-orange">
                            <div>
                                <input type="checkbox" className="mr-2" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
                                <span className= "text-xl glow-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.content}</span>
                            </div>
                            <div>
                                <button className="px-2 py-1 ml-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDeleteTodo(todo.id)}><FaTrashAlt /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
