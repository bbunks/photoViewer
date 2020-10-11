import React, { useEffect, useState } from "react";
import classes from "./Albums.module.css";
import { useParams } from "react-router-dom";
import axios from "../../axiosQuery";
import Album from "./Album/Album";

function Albums(props) {
    const [albums, setAlbums] = useState();
    const { year } = useParams();
    useEffect(() => {
        axios
            .get("/albums/" + year)
            .then((response) => {
                setAlbums((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));
    }, [year]);

    return (
        <div className={classes.Albums}>
            {albums ? (
                albums.map((ele) => {
                    return <Album key={ele.name} album={ele} />;
                })
            ) : (
                <p>loading</p>
            )}
        </div>
    );
}

export default Albums;
