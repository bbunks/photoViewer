import React, { useEffect, useState, useContext } from "react";
import classes from "./Albums.module.css";
import { useParams } from "react-router-dom";
import axios from "../../axiosQuery";
import Album from "./Album/Album";
import TitleContext from "../../context/TitleContext/TitleContext";

function Albums(props) {
    const [albums, setAlbums] = useState();
    const { year } = useParams();
    const [context, setContext] = useContext(TitleContext);

    useEffect(() => {
        axios
            .get("/albums/" + year)
            .then((response) => {
                setAlbums((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));

        setContext({
            name: year,
            returnPath: "/",
        });
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
