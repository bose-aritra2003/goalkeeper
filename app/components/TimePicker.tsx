'use client';
import React, { useEffect, useState } from "react";

function TimePicker(){
  const [time,setTime] =useState(new Date());

  useEffect(()=>{
      setInterval(()=>setTime(new Date()),60 * 1000)
  },[setInterval, setTime])

  return(
    <div className="flex sm:divide-x text-lg lg:text-xl w-fit font-bold text-white drop-shadow-md">
      <p className="hidden sm:block pr-2">
        {
          time.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})
        }
      </p>

      <p className="pl-2">
        {
          time.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
        }
      </p>
    </div>
  )
}

export default TimePicker;