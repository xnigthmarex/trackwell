import React, { useEffect, useState } from "react";

interface Journal {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
}

interface MainProps {
    props: any;
    selectedJournal: Journal | null;
    onJournalChange: (journal: Journal) => void;
}

export default function Main({ selectedJournal, onJournalChange }: MainProps) {
    const [heading, setHeading] = useState<string>("Please Select a Journal to View/Write");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (selectedJournal) {
            setHeading(selectedJournal.title);
            setContent(selectedJournal.content);
        } else {
            setHeading("Please Select a Journal to View/Write");
            setContent("");
        }
    }, [selectedJournal]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSaveClick = () => {
        if (selectedJournal) {
            onJournalChange({ ...selectedJournal, content });
        }
    };

    return (
        <div>
            <div className="flex items-center rounded-lg justify-between p-2 border-r-2 border-l-2 border-t-2">
                <h1 className="text-xl font-bold">{heading}</h1>
                <button 
                    className="ml-auto bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" 
                    onClick={handleSaveClick}
                >
                    Save
                </button>
            </div>
            <textarea
                className="custom-textarea rounded-lg border-2 bg-transparent w-full h-[84vh] text-xl font-bold resize-none overflow-auto p-2"
                value={content}
                onChange={handleContentChange}
            ></textarea>
        </div>
    );
}
