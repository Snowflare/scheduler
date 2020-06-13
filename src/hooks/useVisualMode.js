import React, { Fragment, useState, useEffect, useRef } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(m, replace = false) { 
    if (replace){
      //console.log(history);
      
      //console.log([...history.slice(0,history.length-1), m]);
      
      //setHistory([...history.slice(0,history.length-1), m])
      setHistory(prev => ([...prev.slice(0, prev.length-1), m]))
    } else {
      //setHistory([...history, m]);
      //console.log('set',history);
      
      setHistory(prev => ([...prev, m]))
    }
    setMode(m);
    
  }
  
  function back() { 
    if (history.length > 1){
      const popHistory = history.slice(0, history.length - 1)
      // console.log('back', history);
      
      setHistory(popHistory);   
      setMode(popHistory[popHistory.length - 1]);
    }    
  }

  return { mode, transition, back };
};
  
