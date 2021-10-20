import React, { useContext } from "react";
import classes from "./Header.module.css";
import { useHistory, Link } from "react-router-dom";
import TitleContext from "../../context/TitleContext/TitleContext";

function Header(props) {
    let history = useHistory();
    const [context, setContext] = useContext(TitleContext);

    //<Link className={classes.LinkStyle} to={"."}><h2> {"<"} </h2></Link>
    return (
        <header className={classes.Header}>
            <div className={classes.Title}>
                <h1>{context.name}</h1>
            </div>
            <div className={classes.NavContainer}>
                <div className={classes.Container}>
                    <Link to={context.returnPath} className={classes.LinkStyle}>
                        <button className={classes.Button}>Back</button>
                    </Link>
                </div>
                <div className={classes.Container}>
                    <Link to={context.returnPath} className={classes.LinkStyle}>
                        <button className={classes.Button}>Random Photo</button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
