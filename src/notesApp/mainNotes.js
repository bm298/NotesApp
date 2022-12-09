import React from "react";
import './mainNotesCss.css';
import { FaLeaf, FaTrashAlt} from 'react-icons/fa';
import {AiFillEdit,AiOutlineArrowDown,AiOutlineArrowUp} from 'react-icons/ai';
import {TiArrowSortedDown,TiArrowSortedUp} from 'react-icons/ti'
import SideTasksCompleted from "./SideTasksCompleted";
import SidebarNotesEl from "./sidebarNotes";
import SideDeleteNotes from "./SideDeleteNotes";




export default function AddNote(){
    const [isChecked, setisChecked]= React.useState(false)

        React.useEffect(() => {
        if (notes.length===0 && !sorted){
            setSorted1(false)
        }
        else if (notes.length===0 && !sorted1){
            setSorted(false)
        }

           });        
    
    //React.useEffect(() => {
        // notes.map over arrray to display on every render

    const [notes, setNotes] = React.useState([
{
    id: 1,
    addTitle: "Rearrange Wardrobe" ,
    addText: "Wake up at 9am and start sorting clothes",
    status: "Completed",
    isChecked: isChecked
}, {
    id: 2,
    addTitle: "Gym" ,
    addText: "Hit the gym after work",
    status: "Not Completed",
    isChecked: isChecked
},{
    id: 3,
    addTitle: "Emails" ,
    addText: "Read through daily emails",
    status: "Not Completed",
    isChecked: isChecked
},{
    id: 4,
    addTitle: "Skin Care" ,
    addText: "Start new skin care routine",
    status: "New Notes",
    isChecked: isChecked
},{
    id: 5,
    addTitle: "Meditate" ,
    addText: "Start meditating before going to sleep",
    status: "New Notes",
    isChecked: isChecked
}
]
)


    const [formData, setFormData] = React.useState(
        {id: notes.length+1, addTitle: "", addText: "",status:""}
    )

    function handleChange(event, id) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })

        let tempNotes= notes.map((note) => 
        note.id===id ? {...note, isChecked:checked} : note
        )

        setNotes(tempNotes)
    }


    function submitForm(event){
        event.preventDefault()

        const newFormData= {
            id: notes.length+1,
            addTitle: formData.addTitle,
            addText: formData.addText,
            status: "New Notes",
        }

        const newFormDatas= [...notes, newFormData]
        setNotes(newFormDatas)
        toggleShown()
        setFormData({id: notes.length+1, addTitle: "", addText: ""})
    
        if (notes.length=1){
            setSorted1(true)
        }
        else {}
    }

    const [isShown, setIsShown] = React.useState(false)
    const [deleteBtn, setDeleteBtn]= React.useState(false)

    function toggleShown(){
        setIsShown(prevShown => !prevShown)
    }

    function editNotes(currentNoteId){
        setIsShown(true)
        // setFormData(oldNotes=>{
        //     for (let i=0; i<oldNotes.length; i++){
        //         if (currentNoteId===oldNotes[i].id){
        //             return ({...oldNotes[i], addTitle:"nearly there..."})
        //         }
        //         else {console.log("hello")}
        //     }
        // })
    }


    function closeSideBarNotes(){
        setIsShown(false)
    }

    const [notesToDelete, setNotesToDelete] =React.useState([]);
    function handleCheckBoxChange(event, noteId){

        let toDeleteArray= notesToDelete
        if (event.target.checked) {
            setDeleteBtn(true)
            toDeleteArray.push(noteId)
            }
            else {
                let position= toDeleteArray.findIndex((note)=> note===noteId)
                toDeleteArray.splice(position,1)
                console.log(position)
            }

        if (notesToDelete.length<1){
            setDeleteBtn(false)
        }
            setNotesToDelete(toDeleteArray)
            //console.log(toDeleteArray)
    }

    function handleChangeDeleteBtnNo(){
        let idallUnclick= []
        for ( let i=0;i<notes.length; i++){
            let total= {...notes[i], isChecked:false} 
            idallUnclick.push(total)
            setDeleteBtn(false)
           
        }
        setNotes(idallUnclick)
        setisChecked(false)
    }

    
    function handleChangeDeleteBtnYes(){
        setisChecked(false)
         let newNotesArray=notes.slice()
        newNotesArray=newNotesArray.filter((note) =>{
            if (!notesToDelete.includes(note.id)){
                return true
            }            
        }
    )
    setNotes(newNotesArray)
    setDeleteBtn(false)
    setNotesToDelete([])   
    }
    
    function selectAllId(event){
        
        if (event.target.checked){
            setisChecked(true)
        let idAllClick= []
        let newNotesToDelete=[]
    for ( let i=0;i<notes.length; i++){
        newNotesToDelete.push(notes[i].id)
        console.log(newNotesToDelete)
        let total= {...notes[i], isChecked:true } 
        idAllClick.push(total)
        setDeleteBtn(true)
    }
    setNotes(idAllClick)
    setNotesToDelete(newNotesToDelete)
    }

    else{
        setisChecked(false)
        setNotesToDelete([])
        let idallUnclick= []
    for ( let i=0;i<notes.length; i++){
        let total= {...notes[i], isChecked:false } 
        idallUnclick.push(total)
        setDeleteBtn(false)
    }
    setNotes(idallUnclick)
    }

}


        // console.log(notes.includes(notesToDelete))
        // for (let i=0; i<notes.length;i++){
        //     // let holdDelete=finalDelete
        //     let allHeld= notes[i].id
        //     for (let i=0; i<notesToDelete.length;i++){
        //          console.log(notesToDelete[i],allHeld)
        //          console.log(notesToDelete[i]===allHeld)
        //          notesToDelete.includes(note.id)
        //         // if (notesToDelete[i]!==allHeld){
        //         //     holdDelete.push("all the numbers that dont match")
        //         //     setNotes(holdDelete)

        //         // setNotes(oldNotes => oldNotes.filter(allHeld!==notesToDelete))

                    //console.log(allHeld)
                    // console.log(notesToDelete[i],allHeld)
                    // console.log(notesToDelete[i]!==allHeld)


                  //  console.log(holDelete.splice(i,1))

                    // let positionInNotes=notes.findIndex((note)=>console.log(note.id!==notesToDelete))
                    // console.log(positionInNotes)
                    // console.log(allHeld)
                    // console.log(allHeld[i])
                    // console.log(notes[allHeld-1])
                    // holdDelete.push(notes[allHeld-1])
                
            
            // setNotes(oldNotes => oldNotes.filter(allHeld!==notesToDelete[i]||"undefined"))
            // }
        // let result= notes.filter(notes[i].id !== notesToDelete)
        // console.log(result)
        // setNotes(oldNotes => oldNotes.filter(notes[i].id !== notesToDelete[i]))
        // }

        // let holdDelete=finalDelete
        //  //   let allHeld= notes[i].id
        //     for (let p=0; p<notesToDelete.length;p++){
        //         // console.log(notes[i].id, notes[p].id)
        //        console.log(notes[p].id)
        //         if (notes[i].id!==notesToDelete[p]){
        //         //   console.log(notes[i].id!==notesToDelete[p])
                    
        //         //    holdDelete.push(...allHeld)
        //         }
        // setNotes(oldNotes => oldNotes.filter(notes[i].id !== notesToDelete))
        // const toDeleteArray=[]
        // for (let i=0; i<notes.length;i++){
        //     if (notes[i].id===textId){
        //         toDeleteArray.unshift(...notes)
        //         console.log(...notes)
        //     }
        //     else{
        //         toDeleteArray.push("")
        //     }
        // }
        // // setNotes(toDeleteArray)

    

        // const position= notes.findIndex((text) => {
        //     if (text.id === textId){
        //         toDeleteArray.push(textId)
        //         return textId===text.id
        //     }
        //     else {console.log("ids aint matching bra ")}
        //     })
        //     console.log(position)
        //     console.log(toDeleteArray)
      
        // const numbers= [55,32,54,23,75,3,6,7,4]
        // React.useEffect(() => {
        //     setNotes(sorted)
        //     }, [sorted]);

        const [sorted, setSorted]= React.useState(false)
        function sortAsc(){
            if (notes.length>0){
                setSorted1(prevSorted1 => !prevSorted1)
                let sumAsc=notes.sort(function compareFunc(a,b){
                    return b.id- a.id
                 }
            )
            console.log(sumAsc)
            setSorted(sumAsc)
            }
            else{
                setSorted1(false)
                setSorted(false)
        }
    }

    const [sorted1, setSorted1]= React.useState(true)
    function sortDesc(){
        if (notes.length>0){
        setSorted(prevSorted => !prevSorted)
        let sumDesc=notes.sort(function compareFunc(a,b){
            return a.id -b.id
         }
    )
    console.log(sumDesc)
    setSorted1(sumDesc)
        }
        else{
        setSorted(false)
        setSorted1(false)
    }

}


console.log(notes)
console.log(sorted)
console.log(sorted1)
console.log(notes.length)

    return(
    <div className="container">
        <SideTasksCompleted notes={notes} />
        <div className="tableContainer">
            <table cellPadding="5rem">
                <thead>
                    <tr>
                        <th className="th-ID"> <input type="checkbox"checked={isChecked} onChange={(event) => selectAllId (event)}/>
                        ID  
                        {/* {sorted ? <AiOutlineArrowDown onClick={sortDesc} /> : <AiOutlineArrowUp onClick={sortAsc} />} */}
                        {sorted ? <TiArrowSortedDown onClick={sortDesc} />:"" }
                        {sorted1? <TiArrowSortedUp onClick={sortAsc} />:"" }
                        </th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((eachNote) => {
                        return(
                    <tr>
                        <td><input type="checkbox"
                        onChange={(event ) => handleCheckBoxChange(event, eachNote.id)}
                        onClick={(event ) => handleChange(event, eachNote.id)}
                        checked={eachNote.isChecked}
                        name="isChecked"
                        />
                        <span className="Th-No">{eachNote.id}</span>
                        </td>
                        <td>{eachNote.addTitle}</td>
                        <td>{eachNote.addText}</td>
                        <td>{eachNote.status}</td>
                        <td><button onClick={editNotes}><AiFillEdit /></button>
                        </td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="addBtn">
                <button className="activeAddBtn" onClick={toggleShown}>{isShown?"Hide Note":"Add Note"}</button>
             </div>
            <div className="alertComp">
                <div className="alertComp1">
                    {isShown && <SidebarNotesEl
                                close={closeSideBarNotes}
                                handleChange= {handleChange}
                                submitForm={submitForm}
                                addTitle={formData.addTitle}
                                addText={formData.addText}
                                />}
                </div>
                {deleteBtn && <SideDeleteNotes closeNoBtn={handleChangeDeleteBtnNo} openYesBtn={handleChangeDeleteBtnYes} />}
            </div>
        </div>
    </div>
    )
}

