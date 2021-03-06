import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Auth from "./Components/Auth";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "13vh",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 10px;
    width: 100%;
}
*{
  box-sizing: border-box;
}
`;

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle whiteColor />
        <AlertProvider template={AlertTemplate} {...options}>
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/auth" component={Auth} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </AlertProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
