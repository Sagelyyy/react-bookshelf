import React from "react";

const Card = (props) => {
    return (
        <div className="card--container">
            <span onClick={props.onDelete} className="material-icons delete">delete</span>
            <h1>{props.title}</h1>
            <h2>Author: {props.author}</h2>
            <h4>Pages: {props.pageCount}</h4>
            <h5>Book status: {props.bookStatus === 'on' ? 'Read' : 'Unread'}</h5>
        </div>
    )
}

export default Card