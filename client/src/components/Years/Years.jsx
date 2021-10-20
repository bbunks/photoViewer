import React, { useEffect, useState, useContext } from "react";
import classes from "./Years.module.css";
import axios from "../../axiosQuery";
import Year from "./Year/Year";
import Spinner from "../Spinner/Spinner";
import TitleContext from "../../context/TitleContext/TitleContext";

function Years(props) {
    const [years, setYears] = useState();
    const [context, setContext] = useContext(TitleContext);
    useEffect(() => {
        axios
            .get("/years")
            .then((response) => {
                setYears((prev) => {
                    return response.data;
                });
            })
            .catch((error) => console.log(error));

        setContext({
            name: "Photos",
            returnPath: "/",
        });
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
