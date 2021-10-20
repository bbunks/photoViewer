import React from "react";
import classes from "./Comment.module.css";

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

function dateToString(date) {
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var dateS = "";
    if (
        "" + date.getFullYear() + date.getMonth() + date.getDate() ===
        "" + today.getFullYear() + today.getMonth() + today.getDate()
    ) {
        dateS = "Today";
    } else if (
        "" + date.getFullYear() + date.getMonth() + date.getDate() ===
        "" +
            yesterday.getFullYear() +
            yesterday.getMonth() +
            yesterday.getDate()
    ) {
        dateS = "Yesterday";
    } else {
        dateS =
            months[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear();
    }

    var time =
        (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12) +
        ":" +
        (String(date.getMinutes()).length === 1
            ? "0" + date.getMinutes()
            : date.getMinutes()) +
        (date.getHours() > 11 ? " PM" : " AM");
    return dateS + " | " + time;
}

function Comment(props) {
    let date = new Date(props.comment.date);
    let dateString = Number.isNaN(date) ? "Uhhhhh" : dateToString(date);

    return (
        <div>
            <div className={classes.Header}>
                <h3>{props.comment.authorName}</h3>
                <p>{dateString}</p>
            </div>
            <p className={classes.omment}>
                {props.comment.comment
                    .split("\n")
                    .flatMap((value, index, array) =>
                        array.length - 1 !== index // check for the last item
                            ? [
                                  value,
                                  <br key={props.comment.id + "" + index} />,
                              ]
                            : value
                    )}
            </p>
            <hr className={classes.LineBreak} />
        </div>
    );
}

export default Comment;
