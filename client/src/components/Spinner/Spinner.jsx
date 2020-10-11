import React from "react";
import classes from "./Spinner.module.css";

function Spinner(props) {
    return (
        <div className={classes.Spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;
