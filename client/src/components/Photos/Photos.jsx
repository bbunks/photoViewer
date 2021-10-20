import React, { useEffect, useState, useContext } from "react";
import classes from "./Photos.module.css";
import { useParams } from "react-router-dom";
import axios from "../../axiosQuery";
import PhotoIcon from "./Photo/PhotoIcon";
import Spinner from "../Spinner/Spinner";
import TitleContext from "../../context/TitleContext/TitleContext";

function Photos(props) {
    const [photos, setPhotos] = useState();
    const { year, album } = useParams();
    const [context, setContext] = useContext(TitleContext);
    useEffect(() => {
        axios
            .get("/photos/" + album)
            .then((response) => {
                setPhotos((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));

        axios.get("/albumDetails/" + album).then((res) => {
            setContext({
                name: res.data.name,
                returnPath: `/${year}/`,
            });
        });
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
