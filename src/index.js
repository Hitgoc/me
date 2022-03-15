import reactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./frontend/App";

reactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
