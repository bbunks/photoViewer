import React, { useEffect, useState } from "react";
import classes from "./Photos.module.css";
import { useParams } from "react-router-dom";
import axios from "../../axiosQuery";
import PhotoIcon from "./Photo/PhotoIcon";
import Spinner from "../Spinner/Spinner";

function Photos(props) {
    const [photos, setPhotos] = useState();
    const { year, album } = useParams();
    useEffect(() => {
        axios
            .get("/photos/" + album)
            .then((response) => {
                setPhotos((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={classes.Photos}>
            {photos ? (
                photos.map((ele) => {
                    return <PhotoIcon key={"pi" + ele.id} photo={ele} />;
                })
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default Photos;
