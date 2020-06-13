
import DayList from 'components/DayList';
import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import Appointment from "components/Appointment"

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

const setDay = day => setState({ ...state, day });
const setDays = days => setState(prev => ({ ...prev, days }));
const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));

function bookInterview(id, interview) {
  // console.log('Hello',state.appointments[id]);
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  // console.log('Hello 2',appointment);
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  // console.log(interview);
  //setState({...state, appointments});
  return axios.put(`/api/appointments/${id}`, {interview: interview}).then((response)=>{
    console.log(response);    
    setState({...state, appointments});
  })
  //console.log(id, interview);
}

function cancelInterview(id) {
   const appointment = {
    ...state.appointments[id],
    interview: null
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  // console.log(interview);
  //setState({...state, appointments});
  return axios.delete(`/api/appointments/${id}`).then((response)=>{
    console.log('delete', response);    
    setState({...state, appointments});
  })  
  //console.log(id, interview);
}

useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(([ response, response2, response3]) => {
            
      setState(prev => ({...prev, days: response.data, appointments: response2.data, interviewers: response3.data}));     
      
    })
  }, []);
  // console.log(state.interviewers);
  // console.log(state.appointments[1] && state.appointments[1]);
  // console.log(getAppointmentsForDay(state,state.day));
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  //console.log(interviewers);
  
  
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // console.log('interview', interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
  days={state.days}
  day={state.day}
  setDay={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
