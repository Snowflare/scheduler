import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

afterEach(cleanup);


describe("Appointment", () => {
  it("renders without crashing", () => {
    const appointment = {
      id: 1,
      time: "12pm",
      interview: null    
    }
    const interview = null;
    const interviewers = {
      "1": {  
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      },
      "2": {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      },
      3: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
    const bookInterview = () => {};
    const cancelInterview = () => {};
    render(<Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />);
  });
});