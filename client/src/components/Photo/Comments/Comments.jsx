import React, { useState } from "react";
import classes from "./Comments.module.css";
import Comment from "./Comment/Comment";
import Spinner from "../../Spinner/Spinner";
import CommentForm from "./CommentForm/CommentForm";

function Comments(props) {
    let [showCommentForm, setShowCommentForm] = useState(false);
    function startAddingComment() {
        console.log("Pressed");
    }
    return (
        <div>
            {!props.comments ? (
                <Spinner />
            ) : (
                <>
                    <div className={classes.HeaderContainer}>
                        <div className={classes.Header}>
                            <h2>Comments ({props.comments.length})</h2>
                            <button
                                className={classes.AddComment}
                                onClick={(e) => {
                                    setShowCommentForm(true);
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className={classes.CommentsConatiner}>
                        <div className={classes.Comments}>
                            {props.comments.map((comment) => {
                                return (
                                    <Comment
                                        key={"c" + comment.id}
                                        comment={comment}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
            {showCommentForm ? (
                <CommentForm
                    photoid={props.photoid}
                    updateComments={props.updateComments}
                    closeModal={(e) => setShowCommentForm(false)}
                    close={(e) => {
                        setShowCommentForm(false);
                    }}
                />
            ) : null}
        </div>
    );
}

export default Comments;
