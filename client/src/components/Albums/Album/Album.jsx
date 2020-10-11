import React from "react";
import classes from "./Album.module.css";
import { Link } from "react-router-dom";

function Album(props) {
    return (
        <Link
            className={classes.LinkStyle}
            to={"/" + props.album.year + "/" + props.album.id}
        >
            <div className={classes.Album}>
                <h3 className={classes.Label}>{props.album.name}</h3>
            </div>
        </Link>
    );
}

export default Album;
