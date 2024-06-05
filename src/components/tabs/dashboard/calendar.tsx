
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className= "w-full h-full p-2">
         <h1 className="glow-text text-2xl lg:text-3xl flex items-center justify-center">Calendar</h1>
         <div className = "bg-black h-[86vh] border-2 p-2"></div>
    </div>
  );
}

