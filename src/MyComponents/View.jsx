import "./View.css"
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const View = () => {

  const {darkTheme} = useContext(ThemeContext);

  const { id } = useParams();
  const allTasks = useSelector((state) => state.tasks.tasks);
  const task = allTasks.find((task) => task.id === parseInt(id));

  const [taskContent, setTaskContent] = useState(task?.content || "");



  const allNotes = useSelector((state) => state.notes.notes);
  const note = allNotes.find((note) => note.id === parseInt(id));

  const [noteContent, setNoteContent] = useState(note?.content || "");
  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteCategory, setNoteCategory] = useState(note?.category || "");
  
  return (
    <div id="view_box">

      {task &&(
        <div id="task_view">

          <h1 id="task_view_head" className={darkTheme ? "dark" : ""}>Task View:</h1>

          <br /><br />

          <textarea name="task_content" id="task_content_area" value={taskContent} rows={10} cols={50} disabled className={darkTheme ? "dark" : ""}/>
        
        </div>
      )}

      {note &&(
        <div id="note_view">

          <h1 id="task_view_head" className={darkTheme ? "dark" : ""}>Note View:</h1>

          <br /><br />

          <div id="note_detail">
            <input type="text" name="note_title" id="note_title_area" value={noteTitle} disabled className={darkTheme ? "dark" : ""}/>
            <h4 id="note_category_view" className={darkTheme ? "dark" : ""}>Category: {noteCategory}</h4>
            <textarea name="note_content" id="note_content_area" value={noteContent} rows={10} cols={50} disabled className={darkTheme ? "dark" : ""}/>
          </div>
        
        </div>
      )}
      
    </div>
  )
}

export default View