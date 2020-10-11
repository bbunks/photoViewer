import React from "react";
import classes from "./CommentForm.module.css";

function CommentForm(props) {
    return (
        <div
            className={classes.Modal}
            onClick={(e) => {
                props.close();
            }}
        >
            <div
                className={classes.CommentForm}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2>Write a Comment</h2>
                <textarea className={classes.TextArea} rows="4" />
                <button className={classes.Submit}>Submit</button>
            </div>
        </div>
    );
}

export default CommentForm;
