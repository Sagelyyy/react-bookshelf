import React from "react";
import '../App.css'

// TODO: Replace the radio buttons with a single toggle button



const EntryForm = (props) => {

    const [form, setForm] = React.useState(
        {
            title: '',
            author: '',
            pageCount: '',
            bookStatus: ''
        }
    )

    const onChange = (e) => {
        const { name, value } = e.target
        setForm(old => {
            return (
                {
                    ...old,
                    [name]: value
                }
            )
        })

    }

    return (
        <div>
            <form onSubmit={((e, data) => props.onSubmit(e, form))} className="input--container">
                <input
                    onChange={onChange}
                    placeholder="Title"
                    className="input--title"
                    name="title"
                ></input>
                <input
                    onChange={onChange}
                    placeholder="Author"
                    className="input--author"
                    name="author"
                ></input>
                <input
                    onChange={onChange}
                    placeholder="Total pages"
                    className="input--pages"
                    name="pageCount"
                ></input>
                <div className="container">
                    <p>Read?</p>
                    <label className="switch"><input
                        onChange={onChange}
                        type="checkbox"
                        name="bookStatus"
                    />    <div></div>
                    </label>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EntryForm