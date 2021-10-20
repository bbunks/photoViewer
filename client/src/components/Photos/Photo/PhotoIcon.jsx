import React from "react";
import classes from "./PhotoIcon.module.css";
import { Link, useParams } from "react-router-dom";
import { queryURL } from "../../../axiosQuery";

function Photo(props) {
    const { year, album } = useParams();
    let style = {
        backgroundImage:
            "url(/photo/" +
            props.photo.id +
            "?authorization=Bearer+" +
            localStorage.getItem("AuthToken") +
            ")",
    };

    return (
        <Link
            className={classes.LinkStyle}
            to={"/" + year + "/" + album + "/" + props.photo.id}
        >
            <div className={classes.Photo} style={style}>
                <div className={classes.Label}></div>
            </div>
        </Link>
    );
}

export default Photo;
