import React, { useEffect, useState } from "react";
import classes from "./Years.module.css";
import axios from "../../axiosQuery";
import Year from "./Year/Year";
import Spinner from "../Spinner/Spinner";

function Years(props) {
    const [years, setYears] = useState();
    useEffect(() => {
        axios
            .get("/years")
            .then((response) => {
                setYears((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={classes.Years}>
            {years ? (
                years.map((ele) => {
                    return <Year key={ele.year} year={ele.year} />;
                })
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default Years;
