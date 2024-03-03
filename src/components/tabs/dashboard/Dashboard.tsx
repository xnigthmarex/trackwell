import Todo from "./Todo";

export default function Dashboard(props: any) {
    
    return (
        <div className = "h-full w-screen">
            <div className = "grid grid-cols-3">
                <div className= "col-start-1 flex items-center justify-center">
                    <Todo props={props?.props}></Todo>
                </div>
                <div className= "col-span-2 items-center flex justify-center">

                </div>
            </div>
        </div>
    );
}
