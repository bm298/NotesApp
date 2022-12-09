import React from "react";

export default function AddNote(props){
    // const noteElements = props.notes.map((note, index) => (

    return(
    <div className="spanAddNote">
        <form className="spanForm">
            <div><h2 className="addNoteH2">Add New Note</h2></div>
            <div className="Inputs"> 
                <input className="titleInput" 
                    type="text"
                    placeholder='Add Title'
                    name="addTitle"
                    onChange={props.handleChange}
                    value={props.addTitle}
                /> 
            </div>
            <div className="Inputs">
                <textarea className="textInput" 
                    placeholder="Type Note"
                    name="addText"
                    onChange={props.handleChange}
                    value={props.addText}
                />
            </div>
            {/* {(props.addTitle.length<2 && props.addText.length<2) && <p>Must Complete Both Boxes</p>}
            {props.addTitle.length<1 && props.addText.length<1 && ""} */}
            <div>
                <button type="submit" className="saveBtn" onClick={props.submitForm}>Save</button>
                <button className="cancelBtn" onClick={props.close}>Cancel</button>
            </div>
        </form>
    </div>
    )
}