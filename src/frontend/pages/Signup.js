import React, { useContext, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./styles/signup.css";
import bcrypt from "bcryptjs";
import { ServingUrl } from "../context/AuthContext";

const Signup = () => {
  const url = useContext(ServingUrl);

  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    confPass: "",
  };

  const [userData, setUserData] = useState(initialUserData);

  const onChangeEventHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  /* form validation */

  const [confPassNotMatched, setConfPassNotMatched] = useState();
  const [userAlreadyExists, setUserAlreadyExists] = useState();
  const [userRegistered, setUserRegistered] = useState();

  /*-----------------*/

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const hashedPass = await bcrypt.hash(userData.pass, 12);

    if (userData.confPass !== userData.pass) {
      setConfPassNotMatched(true);
      setUserAlreadyExists(false);
    } else {
      fetch(`${url.localUrl}/registered`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          pass: userData.pass,
          hashedPass: hashedPass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userAlreadyExists) {
            setUserAlreadyExists(true);
          }

          if (data.userRegistered) {
            setUserAlreadyExists(false);
            setUserRegistered(true);
          }
        });

      setConfPassNotMatched(false);
    }
  };

  return (
    <div className="form-body">
      <form onSubmit={onSubmitHandler}>
        <MDBContainer className="container">
          <MDBCard>
            <MDBCardBody>
              <p className="h3 text-center mb-4">Sign Up</p>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    name="firstName"
                    onChange={onChangeEventHandler}
                    label="First Name"
                    required
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    name="lastName"
                    onChange={onChangeEventHandler}
                    label="Last Name"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                name="email"
                onChange={onChangeEventHandler}
                className="mt-4"
                type="email"
                label="Email address"
                required
              />

              <MDBInput
                name="pass"
                onChange={onChangeEventHandler}
                className="mt-4"
                type="password"
                label="Password"
                required
              />

              <MDBInput
                name="confPass"
                onChange={onChangeEventHandler}
                className="mt-4"
                type="password"
                label="Confirm your password"
                required
              />

              {confPassNotMatched && (
                <p
                  className="mt-4 text-center"
                  style={{ color: "red", fontSize: "17px" }}
                >
                  Password not confirmed !
                </p>
              )}

              {userAlreadyExists && (
                <p
                  className="mt-4 text-center"
                  style={{ color: "red", fontSize: "17px" }}
                >
                  User already exists !
                </p>
              )}

              {userRegistered && (
                <p
                  className="mt-4 text-center"
                  style={{ color: "green", fontSize: "17px" }}
                >
                  User successfully registered !
                </p>
              )}

              <MDBBtn type="submit" block className="mt-4">
                Submit
              </MDBBtn>
              <p className="text-center mt-4">
                Already a user ? <a href="/login">Login</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
};

export default Signup;
