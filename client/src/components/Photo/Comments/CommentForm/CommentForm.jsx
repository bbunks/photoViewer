import React, { useState } from "react";
import classes from "./CommentForm.module.css";
import axios from "../../../../axiosQuery";

function CommentForm(props) {
    const [commentText, setCommentText] = useState("");
    const [badLogin, setBadLogin] = useState(false);

    function submitComment() {
        axios
            .post("/comments/" + props.photoid, {
                comment: commentText,
            })
            .then((response) => {
                console.log("Success");
                props.closeModal();
                props.updateComments();
            })
            .catch((error) => console.log(error));
    }

    const bannerStyle = {
        display: badLogin ? "inline" : "none",
    };

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
                <div className={classes.BadLogin} style={bannerStyle}>
                    <p>Invalid Email and/or Password</p>
                </div>
                <textarea
                    className={classes.TextArea}
                    rows="4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button className={classes.Submit} onClick={submitComment}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default CommentForm;
