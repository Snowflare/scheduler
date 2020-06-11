import React from "react";

import "components/DayListItem.scss";
var classNames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected":props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = (s) => {
    return s === 0? "no spots remaining" : s === 1 ? "1 spot remaining" : `${s} spots remaining`;
  }
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}