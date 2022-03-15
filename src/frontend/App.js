import React, { useCallback, useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext, { ServingUrl } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEvent from "./user/components/CreateEvent";
import NavBar from "./user/components/NavBar";
import ShowEvents from "./user/components/ShowEvents";
import ProfileMe from "./user/pages/ProfileMe";

const App = () => {
  const auth = useContext(AuthContext);
  const url = useContext(ServingUrl);

  const [token, setToken] = useState();
  const [id, setId] = useState();

  const loggedIn = useCallback((token) => {
    setToken(token);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.userToken) {
      auth.token = storedData.userToken;
      loggedIn(storedData.userToken);
      setId(storedData.id);
    }
  }, []);

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const authUser = () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (!storedData) {
      return;
    }

    fetch(`${url.localUrl}/auth`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storedData.userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
  };

  authUser();

  auth.firstName = firstName;
  auth.lastName = lastName;
  auth.email = email;

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path={"/"}>
          <NavBar />
          <ProfileMe />
        </Route>
        <Route exact path={"/login"}>
          <NavBar />
          <ProfileMe />
        </Route>
        <Route exact path={"/home"}>
          <NavBar />
          <ProfileMe />
        </Route>
        <Route path={"/create-an-event"}>
          <NavBar />
          <CreateEvent />
        </Route>
        <Route path={"/show-events"}>
          <NavBar />
          <ShowEvents />
        </Route>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ firstName: firstName, lastName: lastName, email: email }}
    >
      <Switch>{routes}</Switch>
    </AuthContext.Provider>
  );
};

export default App;
