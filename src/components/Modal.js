import React from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import EntryForm from "./EntryForm";

const Modal = (props) => {

    return (
        <div>
            <SlidingPane
                className="modal--pane"
                overlayClassName="some-custom-overlay-class"
                isOpen={props.modalState.isOpen}
                title="New Book Entry"
                subtitle="Please enter a new book below."
                from="left"
                width="400px"
                children={<EntryForm bookshelf={props.bookshelf} onSubmit={((e, data) => props.onSubmit(e, data))} />}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    props.setModalState({ isOpen: false })
                }}
            ></SlidingPane>
        </div>
    )
}

export default Modal