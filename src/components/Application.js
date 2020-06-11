
import DayList from 'components/DayList';
import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import Appointment from "components/Appointment"

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get(`/api/days`)
    .then(({ data }) => {
      console.log('data :>> ', data);
      setDays(data);
    })
  }, [day]);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
  days={days}
  day={day}
  setDay={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        <Appointment key={appointments[0].id} {...appointments[0]} />
        <Appointment key={appointments[1].id} {...appointments[1]} />
        <Appointment key={appointments[2].id} {...appointments[2]} />
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
