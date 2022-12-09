import React from "react";


export default function Tasks(props){

// if (props.notes.status==="completed"){
// let completed= 
// }

for (let i=0; i<props.notes.length; i++){
    if (props.notes[i].status==="completed"){
        //console.log("found completed")
    }
    else if (props.notes[i].status==="not completed"){
        //console.log("found not completed")
    }
    else{
        //console.log("found new")
    }
}

let completed= 1
let notCompleted= 2
let newNotes= props.notes.length-completed-notCompleted 
let total= newNotes+notCompleted+completed

    return (
        <div className="tasks">
            <div className="tasks2">
                <div className="tasksTotal">
                <h4>Total</h4>
                <h2>{total}</h2>
                </div>
                <div className="newNotes">
                <h4>New Notes</h4>
                <h2>{newNotes}</h2>
                </div>
                <div className="tasksCompleted">
                <h4>Completed</h4>
                <h2>{completed}</h2>
                </div>
                <div className="tasksNotCompleted">
                <h4>Not Completed</h4>
                <h2>{notCompleted}</h2>
                </div>
            </div>
        </div>
    )
}
