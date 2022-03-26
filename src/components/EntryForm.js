import React from "react";
import '../App.css'

// TODO: Replace the radio buttons with a single toggle button

const EntryForm = () => {
    return(
        <div className="input--container">
            <form>
                <input placeholder="Title" className="input--title"></input>
                <input placeholder="Author" className="input--author"></input>
                <input placeholder="Pages Read" className="input--pages"></input>
                <input type="radio"></input>
                <input type="radio"></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EntryForm