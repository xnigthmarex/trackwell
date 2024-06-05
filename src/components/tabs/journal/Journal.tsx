import React, { useEffect, useState } from "react";
import Search from "./Search";
import Main from "./Main";
import { update_journal, get_journals } from "./ServerActions";

interface Journal {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
}

export default function Journal(props: any) {
    const user = props?.props?.user;
    const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
    const [journals, setJournals] = useState<Journal[]>([]);

    useEffect(() => {
        fetchJournals();
    }, [props?.props?.user]);

    const fetchJournals = () => {
        get_journals(user)
            .then((result: Journal[]) => {
                setJournals(result);
            })
            .catch((error) => {
                console.error("Error fetching journals:", error);
            });
    };

    const handleJournalSelect = (journal: Journal) => {
        setSelectedJournal(journal);
    };

    const handleJournalChange = (updatedJournal: Journal) => {
        update_journal(updatedJournal)
            .then((result) => {
                setSelectedJournal(result);
                fetchJournals(); // Fetch journals again after updating
            })
            .catch((error) => {
                console.error("Error updating journal:", error);
            });

        setSelectedJournal(updatedJournal);
        setJournals(
            journals.map((journal) =>
                journal.id === updatedJournal.id ? updatedJournal : journal
            )
        );
    };

    return (
        <div className="grid grid-cols-4 h-[92vh] p-1.5">
            <div className="col-start-1 flex justify-center p-1">
                <div className="w-full break-words rounded-2xl p-1 bg-black bg-opacity-30">
                    <Search props={user} onSelectJournal={handleJournalSelect} journals={journals} />
                </div>
            </div>
            <div className="m-1 col-start-2 col-span-3 bg-black bg-opacity-50">
                <Main
                    props={user}
                    selectedJournal={selectedJournal}
                    onJournalChange={handleJournalChange}
                />
            </div>
        </div>
    );
}
