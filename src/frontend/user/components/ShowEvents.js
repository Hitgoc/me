import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBDropdownDivider,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import AuthContext, { ServingUrl } from "../../context/AuthContext";

const ShowEvents = () => {
  const url = useContext(ServingUrl);
  const auth = useContext(AuthContext);

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetch(`${url.localUrl}/show-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: auth.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEventData(data.data);
      });
  }, [auth.email]);

  const onEventDelete = (e) => {
    if (e.target.name) {
      fetch(`${url.localUrl}/delete-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: e.target.name, email: auth.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.response) {
            window.location.reload();
          }
        });
    }
  };

  const onEventDeleteAll = () => {
    if (eventData.length !== 0) {
      fetch(`${url.localUrl}/delete-all-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: auth.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.response) {
            window.location.reload();
          }
        });
    }
  };

  return (
    <div>
      <MDBContainer className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <p className="h3 text-center mb-4">Upcoming events</p>
            <Dropdown.Divider />
            <MDBRow>
              <MDBCol>
                {eventData.length !== 0 ? (
                  <p className="h5 mb-4 mt-4">
                    Total events: {eventData.length}
                  </p>
                ) : (
                  <p className="h2 text-center mt-4">
                    --- No upcoming event ---
                  </p>
                )}
              </MDBCol>
              {eventData.length !== 0 && (
                <MDBCol className="mt-4 mb-4">
                  <MDBBtn
                    onClick={onEventDeleteAll}
                    style={{ float: "right", backgroundColor: "red" }}
                  >
                    Delete all
                  </MDBBtn>
                </MDBCol>
              )}
            </MDBRow>
            <Dropdown.Divider />

            {eventData &&
              eventData.map((event, i) => {
                return (
                  <React.Fragment key={i}>
                    <MDBRow>
                      <MDBCol>Event type: {event.eventType}</MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>
                        Organising company: {event.organisingCompany}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>Event venue: {event.eventVenue}</MDBCol>
                      <MDBCol>
                        <MDBBtn
                          name={event._id}
                          onClick={onEventDelete}
                          style={{ float: "right", backgroundColor: "#ec6226" }}
                        >
                          Delete
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>Event date: {event.eventDate}</MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>Event time: {event.eventTime}</MDBCol>
                    </MDBRow>
                    <MDBDropdownDivider />
                  </React.Fragment>
                );
              })}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default ShowEvents;
