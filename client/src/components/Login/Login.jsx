import React, { useState } from "react";
import classes from "./Login.module.css";
import axios from "../../axiosQuery";
import { Redirect } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [badLogin, setBadLogin] = useState(false);

    function login(email, password) {
        axios
            .post("/login", { email: email, password: password })
            .then((response) => {
                localStorage.setItem("AuthToken", response.data);
                
                setAuthenticated(true);
            })
            .catch((error) => {
                console.log(error);
                setBadLogin(true);
            });
    }

    const bannerStyle = {
        display: badLogin ? "inline" : "none",
    };

    return (
        <div className={classes.Page}>
            {authenticated ? <Redirect to="/" /> : null}
            <div className={classes.LoginContainer}>
                <h3>Login</h3>
                <div className={classes.BadLogin} style={bannerStyle}>
                    <p>Invalid Email and/or Password</p>
                </div>
                <p className={classes.LoginLabel}>Email</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                    className={classes.LoginField}
                />
                <p className={classes.LoginLabel}>Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }}
                    className={classes.LoginField}
                />
                <button
                    className={classes.Button}
                    onClick={(e) => login(email, password)}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
