import React, { useState, useEffect } from "react";
import axios, { queryURL } from "../axiosQuery";

function Image(props) {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        axios
            .get("/photo/" + props.photoid, { responseType: "arraybuffer" })
            .then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );

                setPhoto((prev) => {
                    return "data:;base64," + base64;
                });
            })
            .catch((error) => console.log(error));
    }, [props.photoid]);

    return <img {...props} src={photo} />;
}

export default Image;
