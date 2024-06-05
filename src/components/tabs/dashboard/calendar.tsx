
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function BasicDateCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className= "w-full h-full">
         <h1 className="glow-text text-2xl lg:text-3xl flex items-center justify-center">Calendar</h1>
         <div className = "bg-white"></div>
    </div>
  );
}

