import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import Years from "./components/Years/Years";
import Albums from "./components/Albums/Albums";
import Photos from "./components/Photos/Photos";
import Photo from "./components/Photo/Photo";
import Header from "./components/Header/Header";

function App() {
    return (
        <Router>
            <div className={classes.App}>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Years />
                    </Route>
                    <Route exact path="/:year">
                        <Albums />
                    </Route>
                    <Route exact path="/:year/:album">
                        <Photos />
                    </Route>
                    <Route exact path="/:year/:album/:photoid">
                        <Photo />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
