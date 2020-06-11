import React from "react";
import ReactDOM from "react-dom";
import DayListItem from 'components/DayListItem';


export default function DayList(props) {
  
    const dayItems = props.days.map(day => {
      return (
        <DayListItem 
          key={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}  />
      );
    });

    return dayItems;
  

  // ReactDOM.render(
  //   <DayList days={props.days} setDay={props.setDay} day={props.day}/>,
  //   document.getElementById("root")
  // );
}