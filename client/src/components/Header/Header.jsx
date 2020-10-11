import React from "react";
import classes from "./Header.module.css";
import { useHistory, Link } from "react-router-dom";

function Header(props) {
    let history = useHistory();

    //<Link className={classes.LinkStyle} to={"."}><h2> {"<"} </h2></Link>
    return (
        <header className={classes.Header}>
            <h1>Photo Memories</h1>
        </header>
    );
}

export default Header;
