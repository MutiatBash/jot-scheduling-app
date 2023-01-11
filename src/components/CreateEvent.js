import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateEvent(props) {

  const [isEventCreated, setIsEventCreated] = useState(false);

  const newEvent = {
    "eventId": props.newEventId,
    "eventOrganizer": 'Bhavin',
    "eventName": 'Volleyball',
    "eventDate": new Date().toLocaleDateString(),
    "eventStartTime": '07:30',
    "eventEndTime": '09:00',
    "eventLocation": 'The Club at Prairie Stone, Hoffman Estates'
  }

  const [currentEvent, setCurrentEvent] = useState(newEvent);


  async function postNewEvent() {
    console.log(JSON.stringify({"eventId": props.newEventId}));
    await fetch('http://localhost:3001/api/new-event', {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify({
        eventId: currentEvent.eventId,
        eventDate: currentEvent.eventDate,
        eventName: currentEvent.eventName,
        eventStartTime: currentEvent.eventStartTime,
        eventEndTime: currentEvent.eventEndTime,
        eventLocation: currentEvent.eventLocation,
        eventOrganizer: currentEvent.eventOrganizer
      })
    })
  }

  function onSubmit(e) {
    e.preventDefault();
    setIsEventCreated(true);
    postNewEvent();
  }
  return (
    <div className="main main__CreateEvent">
      {
        !isEventCreated ?
        <div>
        <h1>Enter Event Details</h1>
        <form onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor="eventOrganizer">Your Name: </label>
            <input type="text" name="eventOrganizer" defaultValue={newEvent.eventOrganizer} onChange={e => setCurrentEvent(Object.assign({}, currentEvent, {eventOrganizer:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventName">Event Name: </label>
            <input type="text" name="eventName" defaultValue={newEvent.eventName} onChange={e => setCurrentEvent(Object.assign({}, currentEvent, {eventName:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventDate">Date: </label>
            <input type="date" name="eventDate" defaultValue={newEvent.eventDate} onChange={e => setCurrentEvent(Object.assign({}, currentEvent, {eventDate:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventStartTime">Start: </label>
            <input type="time" name="eventStartTime" defaultValue={newEvent.eventStartTime} onChange={e => setCurrentEvent(Object.assign({}, currentEvent, {eventStartTime:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventEndTime">End: </label>
            <input type="time" name="eventEndTime" defaultValue={newEvent.eventEndTime} onChange={e => setCurrentEvent(Object.assign({}, currentEvent, {eventEndTime:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventLocation">Location: </label>
            <input type="address" name="eventLocation" defaultValue={newEvent.eventLocation} onChange={e => setCurrentEvent(Object.assign({}, currentEvent, {eventLocation:(e.target.value)}))}/>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      :
      <div className="feedback">
        <h2>Success!</h2>
        <span>Your event id is <span style={{fontWeight: "700"}}>{props.newEventId}</span>. Click </span>
        <Link to={"/view-eventId=" + props.newEventId} style={{textDecoration: "underline"}}>here</Link>
        <span> to view your event.</span>
      </div>
      }
    </div>
  )
}
