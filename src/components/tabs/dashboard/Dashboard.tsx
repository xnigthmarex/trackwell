import React from "react";
import Todo from "./Todo";
import Calendar from "./calendar";

export default function Dashboard(props: any) {
    const user = props?.props?.user;

    return (
        <div className="h-screen w-screen">
            <div className="grid grid-cols-3 h-full">
                <div className="col-start-1 flex justify-center">
                    {user && (
                        <div className="w-full">
                            <Todo props={props?.props} />
                        </div>
                    )}
                </div>
                <div className="col-start-2 col-span-2 flex justify-center">
                    <Calendar />
                </div>
            </div>
        </div>
    );
}
