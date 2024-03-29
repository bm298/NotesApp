import React from "react";
import './mainNotesCss.css';
import {FaEdit} from 'react-icons/fa';
import {TiArrowSortedDown,TiArrowSortedUp} from 'react-icons/ti'
import SideTasksCompleted from "./SideTasksCompleted";
import SidebarNotesEl from "./sidebarNotes";
import SideDeleteNotes from "./SideDeleteNotes";

export default function AddNote(){
// STATE START
    const [notes, setNotes] = React.useState( notes ? [] : (storedValues) )
    const [isChecked, setisChecked]= React.useState(false)
    const [sorted, setSorted]= React.useState(true)
    const [sorted1, setSorted1]= React.useState(true)
    const [isShown, setIsShown] = React.useState(false)
    const [deleteBtn, setDeleteBtn]= React.useState(false)
    const [notesToDelete, setNotesToDelete] =React.useState([]);
    const [calculateAmountDue, setCalculateAmountDue]= React.useState()
    const [pushedCurrentNoteId, setPushedCurrentNoteId] = React.useState()
    const [toggleUpdate, setToggleUpdate] = React.useState(false)
    const [formErrors, setFormErrors] = React.useState([])
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [formData, setFormData] = React.useState({
        id: notes.length+1,
        ShiftDate: "",
        Company: "",
        Hours:"",
        Rate: "",
        Extra:"",
        Paid:"",
        AmountDue:"",
        Tax:"",
        AmountLeft:"",
    })

// FUNCTIONS START

    function storedValues(){
        let getStoredValues= localStorage.getItem("form")
        return JSON.parse(getStoredValues)
    }

    // USE EFFECT HOOKS

        React.useEffect(() => {
            localStorage.setItem("form", JSON.stringify(notes) )
            console.log(notes)
        },[notes])
 
        React.useEffect(() => {
        if (notes.length===0 && !sorted){
            setSorted1(false)
            // change variables sorted names
        }
        else if (notes.length===0 && !sorted1){
            setSorted(false)
            }
        });
           
        React.useEffect(() => {
            setCalculateAmountDue(formData.Hours*formData.Rate)
            }); 

        React.useEffect(() => {
           if (Object.keys(formErrors).length===0 && isSubmit ){
                submitForm()
                setIsSubmit(false)
           }
        },[formErrors]);

    
    //HANDLE FUNCTIONS

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

    function formSubmitAll(e){
        e.preventDefault()

      if (validateEntry(formData)){
      setIsSubmit(true)
      setFormErrors(validateEntry(formData))
        }
    }

    function validateEntry (values){
        const errors= {}
        if (!Number.isInteger(parseInt(values.Hours))){
            errors.Hours= "titleInputError"
        }

        if (!Number.isInteger(parseInt(values.Rate))){
            errors.Rate= "titleInputError"
        }
      
        if (!Number.isInteger(parseInt(values.Extra))){
            errors.Extra= "titleInputError"
        }
       
        if (!Number.isInteger(parseInt(values.Tax))){
            errors.Tax= "titleInputError"
        }
      return errors
    }


    function submitForm(){
       
        const newFormData= {
            id: notes.length+1,
            ShiftDate: formData.ShiftDate,
            Company: formData.Company,
            Hours: parseInt(formData.Hours),
            Rate: formData.Rate,
            Extra: formData.Extra,
            Paid: formData.Paid,
            AmountDue: parseInt(formData.Extra)+(parseInt(formData.Hours)*parseInt(formData.Rate)),
            Tax: (calculateAmountDue*formData.Tax/100),
            AmountLeft: calculateAmountDue-(calculateAmountDue*formData.Tax/100),
        }

        const newFormDatas= [...notes, newFormData] 

        setCalculateAmountDue(formData.Tax)
        setNotes(newFormDatas)
        
        //TOGGLE CLOSE "ADD SHIFT" BOX
        toggleShown()

        //RESET INPUT FIELDS AFTER SUBMIT
        setFormData({
            id: notes.length+1,
            ShiftDate: "",
            Company: "",
            Hours:"",
            Rate: "",
            Extra:"",
            Paid:"",
            AmountDue:"",
            Tax:"",
            AmountLeft:"",
        })
    
        if (notes.length=1){
            setSorted1(true)
        }
        else {}
    }

    function toggleShown(){
        setIsShown(prevShown => !prevShown)
        setToggleUpdate(false)
    }

    function editNotes(e, currentNoteId){
        setIsShown(true)
        setToggleUpdate(true)
        let notesEdit= notes.slice()
        for (let i=0; i<notesEdit.length; i++){
           let taxInt=notesEdit[i].Tax/(notesEdit[i].Hours*notesEdit[i].Rate)

            if (currentNoteId===notesEdit[i].id){
                setPushedCurrentNoteId(currentNoteId)
                setFormData({...notesEdit[i], Tax:taxInt*100})
            }
        }
    }

    function updateForm(event){
        event.preventDefault()
        setToggleUpdate(false)
        
        let updateNotes= notes.map((note) => 
        pushedCurrentNoteId===note.id ? 
        {...note,
            id: formData.id,
            ShiftDate: formData.ShiftDate,
            Company: formData.Company,
            Hours: parseInt(formData.Hours),
            Rate: formData.Rate,
            Extra: formData.Extra,
            Paid: formData.Paid,
            AmountDue: parseInt(formData.Extra)+(parseInt(formData.Hours)*parseInt(formData.Rate)),
            Tax: (calculateAmountDue*formData.Tax/100),
            AmountLeft: calculateAmountDue-(calculateAmountDue*formData.Tax/100),
        }  
        : 
        note
        )
        setNotes(updateNotes)
        setIsShown(false)    
        setFormData({
            id: notes.length+1,
            ShiftDate: "",
            Company: "",
            Hours:"",
            Rate: "",
            Extra:"",
            Paid:"",
            AmountDue:"",
            Tax:"",
            AmountLeft:"",
        })
    }



    function closeSideBarNotes(){
        setIsShown(false)
        setToggleUpdate(false)
        setIsSubmit(false)
        setFormData({
            id: notes.length+1,
            ShiftDate: "",
            Company: "",
            Hours:"",
            Rate: "",
            Extra:"",
            Paid:"",
            AmountDue:"",
            Tax:"",
            AmountLeft:"",
        })
    }

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
        })
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

        function sortAsc(){
            if (notes.length>0){
                setSorted1(prevSorted1 => !prevSorted1)
                let sumAsc=notes.sort(function compareFunc(a,b){
                    return b.AmountDue- a.AmountDue
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

    function sortDesc(){
        if (notes.length>0){
            setSorted(prevSorted => !prevSorted)
            let sumDesc=notes.sort(function compareFunc(a,b){
                return a.AmountDue -b.AmountDue
            })
            setSorted1(sumDesc)
        }
        else{
            setSorted(false)
            setSorted1(false)
        }
    }


    return(
        
    <div className="container">

    {/* Animated Background Start */}
    <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
    </div>
    {/* Animated Background End */}

        <SideTasksCompleted notes={notes} />
        <div className="tableContainer">
            <table cellPadding="5rem">
                <thead>
                    <tr>
                        <th className="th-ID"> <input type="checkbox"checked={isChecked} onChange={(event) => selectAllId (event)}/>
                        {/* ID  
                        {sorted ? <TiArrowSortedDown onClick={sortDesc} />:"" }
                        {sorted1? <TiArrowSortedUp onClick={sortAsc} />:"" } */}
                        </th>
                        <th>Shift Date</th>
                        <th>Company</th>
                        <th>Hours</th>
                        <th>Rate</th>
                        <th>Extra</th>
                        <th>Paid</th>
                        <th>Amount Due
                        {sorted ? <TiArrowSortedDown onClick={sortDesc} />:"" }
                        {sorted1? <TiArrowSortedUp onClick={sortAsc} />:"" }
                        </th>
                        <th>Tax</th>
                        <th>Amount left</th>
                        <th>Edit</th>
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
                        </td>
                        <td>{eachNote.ShiftDate}</td>
                        <td>{eachNote.Company}</td>
                        <td>{eachNote.Hours}</td>
                        <td>£{eachNote.Rate}</td>
                        <td>£{eachNote.Extra}</td>
                        <td>{eachNote.Paid}</td>
                        <td className="styleAmountDue">£{eachNote.AmountDue}</td>
                        <td className="styleTax">£{eachNote.Tax}</td>
                        <td className="styleAmountLeft">£{eachNote.AmountLeft}</td>
                        <td><button className="FaEditBtn" onClick={(e) => editNotes(e,eachNote.id)}>
                            <FaEdit className="FaEdit" />
                            </button>
                        </td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="addBtn">
                <button className="activeAddBtn" onClick={toggleShown}>{isShown?"Hide Shift":"Add Shift"}</button>
             </div>
            <div className="alertComp">
                <div className="alertComp1">
                    {isShown && <SidebarNotesEl
                                close={closeSideBarNotes}
                                handleChange= {handleChange}
                                submitForm={submitForm}
                                updateForm= {updateForm}
                                formSubmitAll= {formSubmitAll}
                                formErrorsHours= {formErrors.Hours}
                                formErrorsRate= {formErrors.Rate}
                                formErrorsExtra= {formErrors.Extra}
                                formErrorsTax= {formErrors.Tax}
                                isSubmit={isSubmit}
                                toggleUpdate={toggleUpdate}
                                // formData= {formData}
                                ShiftDate= {formData.ShiftDate}
                                Company={formData.Company}
                                Hours={formData.Hours}
                                Rate= {formData.Rate}
                                Extra={formData.Extra}
                                Paid={formData.Paid}
                                AmountDue={formData.AmountDue}
                                Tax={formData.Tax}
                                AmountLeft={formData.AmountLeft}
                                />}
                </div>
                {deleteBtn && <SideDeleteNotes closeNoBtn={handleChangeDeleteBtnNo} openYesBtn={handleChangeDeleteBtnYes} />}
            </div>
        </div>

    <div className="notesContainer">
        
    </div>

    </div>
    )
}

