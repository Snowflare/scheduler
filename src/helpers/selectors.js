export function getAppointmentsForDay(state, day) {
  let appointments = [];
  let res = [];
  if (state.days && state.days.length !== 0) {
    appointments = state.days.filter(d => d.name === day)[0];
    if (appointments){
      appointments = appointments.appointments;
    } else {
      return res;
    }
    // console.log(appointments);    
    for (let i of appointments){
      res.push(state.appointments[i])
    }
    
  }
  
  return res;
  
}
export function getInterview(state, interview) {
  let inter = {...interview};  
  if (interview) {
    inter = {...inter, interviewer: state.interviewers[interview.interviewer]}
    return inter;

  }
  return null;
  
}
export function getInterviewersForDay(state, day) {
  let appointments = getAppointmentsForDay(state, day);
  let interviewersId = [];
  let interviewersIdList = [];
  let res = [];
  if (appointments) {
    interviewersId = appointments.filter(appointment => appointment.interview);
    //console.log(interviewersId);
    if (interviewersId.length > 0) {
      interviewersId = interviewersId.map(appointment => appointment.interview);
       //console.log(interviewersId);
      for (let i of interviewersId) {
        if (!interviewersIdList.includes(i.interviewer)) {
          interviewersIdList.push(i.interviewer);
        }
      }
      //console.log(interviewersIdList);
      
      for (let i of interviewersIdList) {
        res.push(state.interviewers[i]);
      }
      // console.log(res);
      

    } else {
      return [];
    }
    
    
    
    
    // if (appointments){
    //   appointments = appointments.appointments;
    // } else {
    //   return res;
    // }
    // console.log(appointments);    
    // for (let i of appointments){
    //   res.push(state.appointments[i])
    // }
    
  }
  //console.log(res);
  return res;
  
}