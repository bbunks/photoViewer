import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./Photo.module.css";
import Comments from "./Comments/Comments";
import Image from "../Image";
import axios, { queryURL } from "../../axiosQuery";
import TitleContext from "../../context/TitleContext/TitleContext";

function Photo(props) {
    const { year, album, photoid } = useParams();
    const [comments, setComments] = useState();
    const [commentsAdded, setCommentsAdded] = useState();
    const [context, setContext] = useContext(TitleContext);

    useEffect(() => {
        axios
            .get("/comments/" + photoid)
            .then((response) => {
                setComments((prev) => response.data);
            })
            .catch((error) => console.log(error));

        axios.get("/photoDetails/" + photoid).then((res) => {
            setContext({
                name: res.data.albumName,
                returnPath: `/${year}/${album}`,
            });
        });
    }, [photoid, commentsAdded]);

    return (
        <div className={classes.Photo}>
            <div className={classes.PhotoContainer}>
                <Link
                    to={`/${year}/${album}/${parseInt(photoid) - 1}`}
                    className={classes.NextButton}
                >
                    <div>
                        <p>{"<"}</p>
                    </div>
                </Link>
                <Image className={classes.Image} photoid={photoid} />
                <Link
                    to={`/${year}/${album}/${parseInt(photoid) + 1}`}
                    className={classes.NextButton}
                >
                    <div>
                        <p>{">"}</p>
                    </div>
                </Link>
            </div>
            <Comments
                comments={comments}
                photoid={photoid}
                updateComments={() => setCommentsAdded((prev) => prev + 1)}
            />
        </div>
    );
}

export default Photo;
