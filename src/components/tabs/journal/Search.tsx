import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { create_journal, get_journals } from "./ServerActions";

interface Journal {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
}

interface SearchProps {
    props: any;
    onSelectJournal: (journal: Journal) => void;
    journals: Journal[]; 
}

export default function Search({ props, onSelectJournal, journals }: SearchProps) {
    const [localJournals, setLocalJournals] = useState<Journal[]>([]); // State for storing local journals
    const inputRef = React.createRef<HTMLInputElement>();
    
    useEffect(() => {
        setLocalJournals(journals);
    }, [journals]);


    useEffect(() => {
        // Fetch journals when props change
        get_journals(props)
            .then((result: Journal[]) => {
                setLocalJournals(result); // Update local state with fetched journals
            })
            .catch(error => {
                console.error("Error fetching journals:", error);
            });
    }, [props]);

    const addJournal = () => {
        if (inputRef.current) {
            const inputValue = inputRef.current.value.trim();
            if (inputValue === "") {
                alert("Please enter a value");
                return;
            }
            create_journal({
                title: inputValue,
                content: "",
                userId: props?.id
            }).then((newJournal) => {
                onSelectJournal(newJournal);
                setLocalJournals([...localJournals, newJournal]); // Update local state with new journal
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            });
        }
    };

    return (
        <>
            <div className="grid grid-cols-[73%_auto_auto] gap-2 items-center pr-2">
                <input
                    type="text"
                    placeholder="Search/Add Journal..."
                    className="px-4 py-3.5 border-2 border-purple-500 rounded-xl bg-inherit font-extrabold placeholder-gray-200 flash-purple w-full"
                    ref={inputRef}
                />
                <button className="bg-inherit border-2 border-blue-500 text-white rounded-xl p-3.5 flash-blue">
                    <FaSearch size={24} />
                </button>
                <button className="bg-inherit border-2 border-green-500 text-white rounded-xl p-2 flash-green" onClick={addJournal}>
                    <MdAdd size={36} />
                </button>
            </div>

            <div>
                {localJournals.map((journal) => (
                    <div
                        key={journal.id}
                        className="my-2 flex items-center justify-between p-3 border-2 border-orange-400 rounded-xl font-bold text-lg flash-orange cursor-pointer"
                        onClick={() => onSelectJournal(journal)}
                    >
                        <div className="text-white">{journal.title}</div>
                        <div className="text-white">{journal.createdAt.toDateString()}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
