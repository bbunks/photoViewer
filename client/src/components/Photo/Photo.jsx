import React, { useState, useEffect } from "react";
import { queryURL } from "../../axiosQuery";
import { useParams } from "react-router-dom";
import classes from "./Photo.module.css";
import Comments from "./Comments/Comments";
import axios from "../../axiosQuery";

function Photo(props) {
    const { photoid } = useParams();
    const [comments, setComments] = useState();

    useEffect(() => {
        axios
            .get("/comments/" + photoid)
            .then((response) => {
                setComments((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));
    }, [photoid]);

    return (
        <div className={classes.Photo}>
            <div className={classes.PhotoContainer}>
                <img
                    className={classes.Image}
                    src={queryURL + "photo/" + photoid}
                />
            </div>
            <Comments comments={comments} />
        </div>
    );
}

export default Photo;
