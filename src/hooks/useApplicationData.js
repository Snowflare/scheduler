
import {  useState, useEffect } from "react";
import axios from 'axios';
import {getAppointmentsForDay} from "helpers/selectors"

export default function useApplicationData() {

  const [state, setState] = useState({ // Initialize application state
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
  });

  const setDay = day => setState({ ...state, day }); // Set day with a day string

  // Calculate the remaining spots of provided appointments
  function spots(app) {
    let appointments = getAppointmentsForDay(app, state.day); // Get appointments of selected day
    if (appointments) { // Check if appointments of selected day is empty 
      appointments = appointments.filter(app => app.interview === null); // Filter the empty appoinments
    }
    return appointments.length  // Get remaining spots by counting the length of empty appoinments array
  }

  function updateSpots(appointments) {
    const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Hard code array for index search
    const index = workDays.indexOf(state.day); // Get index of a day in state.days array
  
      let day = {...state.days[index]}; // Create a new instance of day object 
      day.spots = spots(appointments);  // Update the remaining spots of day object with helper
    
      const days = [...state.days]; // Create a new instancee of days array
      days[index] = day; // Update day in days array
    
      return days;    
  }

  // Insert a new interview to local state and remote database
  function bookInterview(id, interview) {
    const appointment = { // Create a new instance of appointment object with updated interview object
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = { // Create a new instance of appointmens object with updated appointment to corresponding id
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview: interview}).then((response)=>{ // Insert new entry of appointment to the database
      const days = updateSpots({...state, appointments}); // Calculate remaining spots of updated appointments
      setState({...state, appointments, days}); // Update state with new days and appointments locally if api request resolves
    })

  }
  // Delete an interview to local state and remote database with provided id
  function cancelInterview(id) {
    const appointment = { // Create a new instance of appointment object with updated interview object
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = { // Create a new instance of appointmens object with updated appointment to corresponding id
      ...state.appointments,
      [id]: appointment
    };    
    
    return axios.delete(`/api/appointments/${id}`).then((response)=>{ // Delete corresponding entry of appointment in the database
      const days = updateSpots({...state, appointments}); // Calculate remaining spots of updated appointments
      setState({...state, appointments, days}); // Update state with new days and appointments locally if api request resolves
    })  
  }

  // Initialize state with database data
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

  return {state, setDay, bookInterview, cancelInterview}
};