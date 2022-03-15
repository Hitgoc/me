import React, { useContext, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./styles/login.css";
import AuthContext, { ServingUrl } from "../context/AuthContext";
import { uid } from "uid";

const Login = () => {
  const auth = useContext(AuthContext);
  const url = useContext(ServingUrl);

  const initialInputData = {
    email: "",
    pass: "",
  };

  const [inputData, setInputData] = useState(initialInputData);

  /* form validation */

  const [noUser, setNoUser] = useState();
  const [id, setId] = useState();
  const [invalidCreds, setInvalidCreds] = useState();

  const storedData = JSON.parse(localStorage.getItem("userData"));

  const onChangeEventHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (storedData) {
      setId(storedData.id);
    }

    fetch(`${url.localUrl}/loggedin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputData.email, pass: inputData.pass }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.noUser) {
          setNoUser(true);
          return;
        }

        if (data.token) {
          window.location.reload();
          const id = uid();

          localStorage.setItem(
            "userData",
            JSON.stringify({ userToken: data.token, id: id })
          );

          auth.isLoggedIn = true;
        }

        if (!data.loggedIn) {
          setInvalidCreds(true);
        } else {
          setInvalidCreds(false);
        }
      });
  };

  return (
    <div className="form-body">
      <form onSubmit={onSubmitHandler}>
        <MDBContainer className="container">
          <MDBCard>
            <MDBCardBody>
              <p className="h3 text-center mb-4">Login</p>

              <MDBInput
                name="email"
                required
                className="mt-4"
                type="email"
                label="Email"
                onChange={onChangeEventHandler}
              />
              <MDBInput
                required
                name="pass"
                className="mt-4"
                type="password"
                label="Password"
                onChange={onChangeEventHandler}
              />

              {noUser && (
                <p
                  className="mt-4 text-center"
                  style={{ color: "red", fontSize: "17px" }}
                >
                  Invalid credentials !
                </p>
              )}

              {invalidCreds && (
                <p
                  className="mt-4 text-center"
                  style={{ color: "red", fontSize: "17px" }}
                >
                  Invalid credentials !
                </p>
              )}

              <MDBBtn type="submit" block className="mt-4">
                Submit
              </MDBBtn>
              <p className="text-center mt-4">
                New user ? <a href="/signup">Register here</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
};

export default Login;
