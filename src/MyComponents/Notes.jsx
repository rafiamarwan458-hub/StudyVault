import './Notes.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { deleteNote, pinNote } from '../Redux/NotesSlice';;
import edit from "./edit.jpg"
import view from "./max.jpg"
import trash from "./delete.png"
import copy from "./copy.jpg";
import pin from "./pin.jpg"
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import darkEdit from "./darkEdit.png";
import darkView from "./darkView.png";
import darkCopy from "./darkCopy.png";
import darkDelete from "./darkDelete.png";
import darkPin from "./darkPin.png";

const Notes = () => {

  const { darkTheme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [searchNote, setSearchNote] = useState("");
  const [filterNote, setFilterNote] = useState("All");

  const filter = notes.filter(
    (note) => (note.title || "").toLowerCase().includes(searchNote.toLowerCase())
  ).filter(note => {
      if(filterNote === 'All'){
        return true;
      }
      else if(note.category === filterNote){
        return true;
      }
      else{
        return false;
      }
    })
    .sort((a, b) => b.pinned - a.pinned);

  const handleDelete = (note) => {
    dispatch(deleteNote(note.id))
  }

  const handleCopy = (content) =>{
    navigator.clipboard.writeText(content);
    toast.success("Note Copied Successfully!");
  }

  const handlePin = (noteId) => {
    dispatch(pinNote(noteId));
  }
  
  return (
    <div id='notes_box'>

      {notes.length === 0 ?(
        <h3 className={`no_note_found_msg ${darkTheme ? "dark" : ""}`}>No Notes Created Yet!</h3>
      )
      : 
      (
        <>
            <div id='notes_header'>
              <div id='search_note'>
                <input type="text" placeholder='Search Note by Title' id='note_search_input' value={searchNote} onChange={(e) => setSearchNote(e.target.value)} className={darkTheme ? "dark" : ""}/>
              </div>

              <div id='notes_filter_btn_box'>
                <button id='all_btn' className={`notes_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilterNote('All')}} style={{backgroundColor: filterNote === 'All' ? "rgba(208, 208, 252, 1)" : ""}}>All</button>
                <button id='general_btn' className={`notes_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilterNote('General')}} style={{backgroundColor: filterNote === 'General' ? "rgba(208, 208, 252, 1)" : ""}}>General</button>
                <button id='work_btn' className={`notes_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilterNote('Work')}} style={{backgroundColor: filterNote === 'Work' ? "rgba(208, 208, 252, 1)" : ""}}>Work</button>
                <button id='study_btn' className={`notes_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilterNote('Study')}} style={{backgroundColor: filterNote === 'Study' ? "rgba(208, 208, 252, 1)" : ""}}>Study</button>
                <button id='other_btn' className={`notes_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilterNote('Other')}} style={{backgroundColor: filterNote === 'Other' ? "rgba(208, 208, 252, 1)" : ""}}>Other</button>
              </div>
            </div>
            
            <br />
            
            {filter.length === 0 ?(
              <h3 className={`no_note_found_msg ${darkTheme ? "dark" : ""}`}>No Notes Found!</h3>
            )
            :
            (
              filter.map((note) => (
                <div key={note.id} className='note_card'>
                  <div id='note_content'>
                    <h4 id='note_title' className={darkTheme ? "dark" : ""}>{note.pinned && "📌"}{note.title}:</h4>
                    <p id='note_content_txt' className={darkTheme ? "dark" : ""}>{note.content.length > 50 ? note.content.slice(0, 50) + "....." : note.content}</p>
                  </div>

                  <div id='category_and_btn_div'>
                    <p id='category' className={darkTheme ? "dark" : ""}>Category: {note.category}</p>
                    
                    <div id='note_btn'>
                      <button id='note_pin_btn' className='note_btns' title='Pin Note' onClick={() =>handlePin(note.id)}>
                        <img src={darkTheme ? darkPin : pin} alt="pin" width={28} height={28} style={{opacity: note.pinned ? 0.3 : 1}}/>
                      </button>
                      <Link to={`/create/?noteId=${note?.id}`}>
                        <button id='note_edit_btn' className='note_btns' title='Edit Note'>
                          <img src={darkTheme ? darkEdit : edit} alt="edit" width={25} height={25}/>
                        </button>
                      </Link>
                      <Link to={`/viewNote/${note?.id}`}>
                        <button id='note_view_btn' className='note_btns' title='View Note'>
                          <img src={darkTheme ? darkView : view} alt="view" width={25} height={25}/>
                        </button>
                      </Link>
                      <button id='note_copy_btn' className='note_btns' onClick={() => handleCopy(note.content)} title='Copy Note'>
                        <img src={darkTheme ? darkCopy : copy} alt="copy" width={25} height={25}/>
                      </button>
                      <button id='note_delete_btn' className='note_btns' onClick={() => handleDelete(note)} title='Delete Note'>
                        <img src={darkTheme ? darkDelete : trash} alt="delete" width={20} height={20}/>
                      </button>
                    </div>
                  </div>                  
                </div>
              ))
            )}
          </>
      )
      }
      
    </div>
  )
}

export default Notes