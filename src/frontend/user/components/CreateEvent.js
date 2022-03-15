import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import AuthContext, { ServingUrl } from "../../context/AuthContext";

const CreateEvent = () => {
  const url = useContext(ServingUrl);

  const auth = useContext(AuthContext);

  const [showCustomEventType, setShowCustomEventType] = useState();

  const initialEventData = {
    eventType: "",
    organisingCompany: "",
    eventVenue: "",
    eventDate: "",
    eventTime: "",
  };

  const [eventData, setEventData] = useState(initialEventData);
  const [eventCreatedLabel, setEventCreatedLabel] = useState();

  const eventTypeOnChangeHandler = (e) => {
    if (e.target.name === "eventType") {
      if (e.target.selectedIndex === 1) {
        setShowCustomEventType(true);
      } else {
        setShowCustomEventType(false);
      }
    }

    if (e.target.name === "customEventType") {
      setEventData({ ...eventData, eventType: e.target.value });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    fetch(`${url.localUrl}/create-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventData: eventData, email: auth.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.dataSaved) {
          setEventCreatedLabel(true);
        } else {
          setEventCreatedLabel(false);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <MDBContainer className="mt-4">
          <MDBCard>
            <MDBCardBody>
              <p className="h3 text-center mb-4">Create an event</p>
              <MDBRow>
                <MDBCol>
                  <Form.Select
                    id="formSelect"
                    required
                    onChange={eventTypeOnChangeHandler}
                    name="eventType"
                  >
                    <option hidden>Event type</option>
                    <option style={{ fontWeight: "bold" }}>
                      Custom event type
                    </option>
                    <option>Conference</option>
                    <option>Seminar</option>
                    <option>Cultural Fest</option>
                    <option>DJ Night</option>
                  </Form.Select>
                </MDBCol>
                {showCustomEventType && (
                  <MDBCol>
                    <MDBInput
                      onChange={eventTypeOnChangeHandler}
                      required
                      id="customEventType"
                      name="customEventType"
                      label="Custom event type"
                    />
                  </MDBCol>
                )}
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-4">
                  <MDBInput
                    onChange={eventTypeOnChangeHandler}
                    required
                    name="organisingCompany"
                    label="Organising company"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-4">
                  <MDBInput
                    onChange={eventTypeOnChangeHandler}
                    required
                    name="eventVenue"
                    label="Event venue"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-4">
                  <Form.Control
                    onChange={eventTypeOnChangeHandler}
                    required
                    name="eventDate"
                    type="date"
                  />
                </MDBCol>
                <MDBCol className="mt-4">
                  <Form.Control
                    onChange={eventTypeOnChangeHandler}
                    required
                    name="eventTime"
                    type="time"
                  />
                </MDBCol>
              </MDBRow>
              {eventCreatedLabel && (
                <p className="h6 text-center mt-4" style={{ color: "green" }}>
                  Event created successfully !
                </p>
              )}
              <MDBBtn className="mt-4" block type="submit">
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
};

export default CreateEvent;
