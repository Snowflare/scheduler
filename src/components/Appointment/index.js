import React, { Fragment } from 'react'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode"
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE'
const SAVING = 'SAVING'
const DELETING = 'DELETING'
const CONFIRM = 'CONFIRM'
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode( 
    props.interview ? SHOW : EMPTY // Set initial mode 
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); // Transit to status Saving
    props.bookInterview(props.id, interview).then(
      (response) => {
         transition(SHOW); // Show updated appointment after saving promise resolved
      }
    ).catch(function (error) {
      transition(ERROR_SAVE, true); // Transit to error status page and replace lastest history to double back
    }) 
  }

  function cancel() {
    transition(DELETING, true); // Transit to status Deleting
    props.cancelInterview(props.id).then(
      (response) => {
         transition(EMPTY); // Show empty appointment after delete promise resolved
      }
    ).catch(function (error) {
      transition(ERROR_DELETE, true); // Transit to error status page and replace lastest history to double back
    })     
  }

 
  
  
  return (
      <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={event => transition('CREATE')} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={event => transition(CONFIRM)}
        onEdit={event=> transition(EDIT)}
      />
      )}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={(cancel)=> back()} onSave={save}/>)}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === ERROR_DELETE && <Error message={'Could not cancel appointment'} onClose={(event) => back()} />}
      {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={(event) => back()} />}
      {mode === CONFIRM && <Confirm onCancel={(cancel)=> back()} onConfirm={event=>cancel()} />}
      {mode === EDIT && (<Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={(cancel)=> back()} onSave={save}/>)}
      </article>
  )  
}
// Storybook Data
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];
// Stories
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")}  />)
  .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewer} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
  .add("Confirm", () => <Confirm message="Delete the appointment?" onConfirm={action("onConfirm")} onCancel={action("onCancel")} />)
  .add("Saving", () => <Status message="Saving" />)
  .add("Deleting", () => <Status message="Deleting" />)
  .add("Error Deleting", () => <Error message="Could not delete appointment." onClose={action("onClose")} />)
  .add("Error Saving", () => <Error message="Could not save appointment." onClose={action("onClose")} />)
  .add("Create", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Edit", () => <Form interviewers={interviewers} name={"sudo"} interviewer={interviewer.id} onSave={(save)=>action(save)} onCancel={(cancel)=>action(cancel)} />)
  .add("Appointment Empty", () => (
  <Fragment>
    <Appointment id={1} time="12pm" />
    <Appointment id="last" time="1pm" />
  </Fragment>
))
.add("Appointment Booked", () => (
  <Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
));
  
  