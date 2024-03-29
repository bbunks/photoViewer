import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import Years from "./components/Years/Years";
import Albums from "./components/Albums/Albums";
import Photos from "./components/Photos/Photos";
import Photo from "./components/Photo/Photo";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import TitleContext from "./context/TitleContext/TitleContext";

function App() {
    const [context, setContext] = useState({
        name: "Photo Viewer",
        returnPath: "/",
    });

    return (
        <Router>
            <TitleContext.Provider value={[context, setContext]}>
                <div className={classes.App}>
                    <Header />
                    <Switch>
                        <Route exact path="/login">
                            <Login />
                        </Route>
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
            </TitleContext.Provider>
        </Router>
    );
}

export default App;
