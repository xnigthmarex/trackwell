import Todo from "./Todo";
import BasicDateCalendar from "./calendar";

export default function Dashboard(props: any) {
    const user = props?.props?.user;

    return (
        <div className="h-full w-screen">
            <div className="grid grid-cols-3">
                <div className="col-start-1 flex items-center justify-center">
                    {user && (
                        <div className="w-full">
                            <Todo props={props?.props} />
                            <BasicDateCalendar />
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}
