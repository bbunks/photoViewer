import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Photo.module.css";
import Comments from "./Comments/Comments";
import Image from "../Image";
import axios, { queryURL } from "../../axiosQuery";

function Photo(props) {
    const { photoid } = useParams();
    const [comments, setComments] = useState();

    useEffect(() => {
        axios
            .get("/comments/" + photoid)
            .then((response) => {
                setComments((prev) => response.data);
            })
            .catch((error) => console.log(error));
    }, [photoid]);
    return (
        <div className={classes.Photo}>
            <div className={classes.PhotoContainer}>
                <Image className={classes.Image} photoid={photoid} />
            </div>
            <Comments comments={comments} photoid={photoid}/>
        </div>
    );
}

export default Photo;
