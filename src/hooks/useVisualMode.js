import  { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial); // Initialize mode state
  const [history, setHistory] = useState([initial]); // Initialize history state
  // mode transition function
  function transition(m, replace = false) { 
    if (replace){ // checks if replace mode is on or not
      setHistory(prev => ([...prev.slice(0, prev.length-1), m])) // replace the last insertion by removing the last index of history
    } else {
      setHistory(prev => ([...prev, m]))
    }
    setMode(m);    
  }
  // set mode back to the previous mode
  function back() { 
    if (history.length > 1){ // Checks if length of history is larger than 1
      const popHistory = history.slice(0, history.length - 1);  // create a new instance of history without the last index of history
      setHistory(popHistory);   
      setMode(popHistory[popHistory.length - 1]);
    }    
  }

  return { mode, transition, back };
};
  
