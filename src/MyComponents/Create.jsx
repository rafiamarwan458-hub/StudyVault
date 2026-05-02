import "./Create.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addTask } from "../Redux/TasksSlice";
import { editTask } from "../Redux/TasksSlice";
import { addNote } from '../Redux/NotesSlice';
import { editNote } from "../Redux/NotesSlice";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

const Create = () => {

  const { darkTheme } = useContext(ThemeContext);

  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");
  console.log("Task Id:",taskId);
  const noteId = searchParams.get("noteId");
  console.log("Note Id:",noteId);

  const task_id = Number(taskId);

  const [taskContent, setTaskContent] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const task_dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);
  
  useEffect(() => {
    if(taskId){
      const currentTask = tasks.find((task) => task.id === task_id);
      if(currentTask){
        setTaskContent(currentTask.content);
        setTaskDueDate(currentTask.dueDate || "");
      }
    }
  }, [taskId, tasks]);

  const handleAddTask = () => {

    if(taskContent.trim() === ""){
      toast.error("Please enter task content");
    }
    else if(taskContent.trim().length < 10){
      toast.error("Please enter task content with at least 10 characters");
    }
    if(taskDueDate.trim() === ""){
      toast.error("Please enter due date");
    }
    
    if(taskContent.trim() !== "" && taskContent.trim().length >= 10 && taskDueDate.trim() !== ""){
        const task = {
          id: taskId ? task_id : Date.now(),
          content: taskContent,
          dueDate: taskDueDate,
          completed: false,
          pinned: false
        }
        if(taskId){
          task_dispatch(editTask(task));
          toast.success("Task Updated successfully");
        }
        else{
          task_dispatch(addTask(task));
          toast.success("Task Added successfully");
        }
        if(!taskId){
          setTaskContent("");
          setTaskDueDate("");
        }
    }
  }



  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("");

  const note_dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes]);

  useEffect(() => {
    if(noteId){
      const currentNote = notes.find((note) => note.id === parseInt(noteId));
      if(currentNote){
        setNoteTitle(currentNote.title);
        setNoteContent(currentNote.content);
        setNoteCategory(currentNote.category);
      }
    }
  }, [noteId, notes]);
  
  const handleAddNote = () => {

    if(noteTitle.trim() === ""){
      toast.error("Please enter note title");
    }
    if(noteContent.trim() === ""){
      toast.error("Please enter note content");
    }
    else if(noteContent.trim().length < 10){
      toast.error("Please enter note content with at least 10 characters");
    }
    if(noteCategory.trim() === ""){
      toast.error("Please enter note category");
    }
    
    if(noteTitle.trim() !== "" && noteContent.trim() !== "" && noteContent.trim().length >= 10 && noteCategory.trim() !== "" && (noteCategory === "General" || noteCategory === "Work" || noteCategory === "Study" || noteCategory === "Other"))
    {
        const note = {
          id: noteId ? parseInt(noteId) : Date.now(),
          title: noteTitle,
          content: noteContent,
          category: noteCategory,
          completed: false,
          pinned: false
        };
        if(noteId){
          note_dispatch(editNote(note));
          toast.success("Note Updated successfully");
        }
        else{
          note_dispatch(addNote(note));
          toast.success("Note Added successfully");
        }
        setNoteTitle("");
        setNoteContent("");
        setNoteCategory("");
    }
  }

  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    if(noteId){
      setActiveTab("notes");
    }

    if(taskId){
      setActiveTab("tasks");
    }
  }, [noteId, taskId]);
  
  return (
    <div id='create_box'>

      <div id="create_nav">
        <button onClick={() => setActiveTab("tasks")} className={`nav_btn ${darkTheme ? "dark" : ""}`} style={{backgroundColor: activeTab === "tasks" ? "rgba(208, 208, 252, 1)" : ""}}>Tasks</button>
        <button onClick={() => setActiveTab("notes")} className={`nav_btn ${darkTheme ? "dark" : ""}`} style={{backgroundColor: activeTab === "notes" ? "rgba(208, 208, 252, 1)" : ""}}>Notes</button>
      </div>

      <br />
    
      {activeTab === "tasks" && (
        <div>
          <div id='tasks_box'>

            <div id='tasks_head' className={darkTheme ? "dark" : ""}>
              <h1>Enter Tasks</h1>
            </div>

          <div id='task_input_box'>
            <textarea placeholder='Content of Task' value={taskContent} onChange={(e)=> setTaskContent(e.target.value)} id='task_content_input' rows="7" cols="50" className={darkTheme ? "dark" : ""}/>
            <br />
            <input type="text" placeholder="Due Date..." value={taskDueDate} onChange={(e)=> setTaskDueDate(e.target.value)} id='task_due_date_input' className={darkTheme ? "dark" : ""}/>
            <br />
            <button onClick={handleAddTask} className={`create_add_btn ${darkTheme ? "dark" : ""}`} id='task_btn'>{taskId ? "Update Task" : "Add Task"}</button>
          </div>
      
          </div>
        </div>
      )}



      {activeTab === "notes" && (
      <div>
        <div id='notes_box'>
  
          <div id='notes_head' className={darkTheme ? "dark" : ""}>
            <h1>Enter Notes</h1>
          </div>

          <div id='note_input_box'>
            <input type="text" placeholder='Title of Note' value={noteTitle} onChange={(e)=> setNoteTitle(e.target.value)} id='note_title_input' className={darkTheme ? "dark" : ""}/>
            <br />
            <input type="text" placeholder="Category of Note" value={noteCategory} onChange={(e)=> setNoteCategory(e.target.value)} id='note_category_input' className={darkTheme ? "dark" : ""}/>
            <p id="category_types" className={darkTheme ? "dark" : ""}>*Category can only be 'General', 'Work', 'Study', 'Other'</p>
            <br />
            <textarea placeholder='Content of Note' value={noteContent} onChange={(e)=> setNoteContent(e.target.value)} id='note_content_input' rows="10" cols="50" className={darkTheme ? "dark" : ""}/>
            <br />
            <button onClick={handleAddNote} className={`create_add_btn ${darkTheme ? "dark" : ""}`} id='note_btn'>{noteId ? "Update Note" : "Add Note"}</button>
          </div>
      
        </div>
      </div>
    )}

    </div>
  )
}

export default Create