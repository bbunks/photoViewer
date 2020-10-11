import React from "react";
import classes from "./Year.module.css";
import { Link } from "react-router-dom";

function Year(props) {
    return (
        <Link className={classes.LinkStyle} to={"/" + props.year}>
            <div className={classes.Year}>
                <h2>{props.year}</h2>
            </div>
        </Link>
    );
}

export default Year;
