export function getAppointmentsForDay(state, day) { // Return appoinments in an array of provided day string
  let appointments = [];
  let res = [];
  if (state.days && state.days.length !== 0) { // Check if days array is loaded from the api server
    appointments = state.days.filter(d => d.name === day)[0]; // Filter out appointments that have matching day
    if (appointments){
      appointments = appointments.appointments;
    } else {
      return res;
    }   
    for (let i of appointments){
      res.push(state.appointments[i])
    }
    
  }
  return res;  
}

export function getInterview(state, interview) { // Return a new instance of interview object with interviewer object retrieved from interviewer id
  let inter = {...interview};  
  if (interview) {
    inter = {...inter, interviewer: state.interviewers[interview.interviewer]}
    return inter;

  }
  return null;
  
}

export function getInterviewersForDay(state, day) { // Return interviewers in an array of provided day string
  let res = [];  
  let interviewersId = state.days.filter(d => d.name === day)[0]; // Filter out interviewers id of desired day
  
  
  if (interviewersId) {    
    interviewersId = interviewersId.interviewers;
    for (let i of interviewersId) {
     res.push(state.interviewers[i]); // Push interviewer object into res array with corresponding id
    }
  }
  
  return res;
  
}