import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pagina404 from "./pages/pagina404";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
// import Alterar from "./pages/Alterar";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/cadastro" component={Cadastro} exact />
      {/* <Route path="/alterar" component={Alterar} exact /> */}
      <Route path="/" component={Home} exact />
      <Route component={Pagina404} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
