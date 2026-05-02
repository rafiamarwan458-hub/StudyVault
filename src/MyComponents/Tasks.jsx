import './Tasks.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleComplete, pinTask } from '../Redux/TasksSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import view from './max.jpg';
import edit from './edit.jpg';
import trash from './delete.png';
import copy from "./copy.jpg";
import toast from "react-hot-toast";
import pin from "./pin.jpg";
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import darkPin from "./darkPin.png";
import darkEdit from "./darkEdit.png";
import darkView from "./darkView.png";
import darkCopy from "./darkCopy.png";
import darkDelete from "./darkDelete.png";

const Tasks = () => {

  const { darkTheme } = useContext(ThemeContext);
  
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState('all');



  const filterTask = tasks.filter(
    (task) => (task.content || "").toLowerCase().includes(searchTask.toLowerCase())
  )
  .filter((task) => {
    if(filter === 'pending'){
      return !task.completed;
    }
    else if(filter === 'completed'){
      return task.completed;
    }
    return true;
  })
  .sort((a, b) => b.pinned - a.pinned);



  const handleDelete = (task) => {
    dispatch(deleteTask(task.id));
  }

  const handleComplete = (taskId) =>{
    dispatch(toggleComplete(taskId));
  }

  const handleCopy = (content) =>{
    navigator.clipboard.writeText(content);
    toast.success("Task Copied Successfully!");
  }

  const handlePin = (taskId) =>{
    dispatch(pinTask(taskId));
  }

  return (
    <div id='tasks_box'>
      
      {tasks.length === 0 ?(
          <h3 className={`no_task_found_msg ${darkTheme ? "dark" : ""}`}>No Tasks Created Yet!</h3>
        )
        : 
        (
          <>
            <div id='tasks_header'>

              <div id='search_task'>
                <input type="text" placeholder='Search Task' id='task_search_input' value={searchTask} onChange={(e) => setSearchTask(e.target.value)} className={`${darkTheme ? "dark" : ""}`}/>
              </div>

              <div id='tasks_filter_btn_box'>
                <button id='all_btn' className={`tasks_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilter('all')}} style={{backgroundColor: filter === 'all' ? "rgba(208, 208, 252, 1)" : ""}}>All</button>
                <button id='pending_btn' className={`tasks_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilter('pending')}} style={{backgroundColor: filter === 'pending' ? "rgba(208, 208, 252, 1)" : ""}}>Pending</button>
                <button id='completed_btn' className={`tasks_filter_btns ${darkTheme ? "dark" : ""}`} onClick={() => {setFilter('completed')}} style={{backgroundColor: filter === 'completed' ? "rgba(208, 208, 252, 1)" : ""}}>Completed</button>
              </div>
              
            </div>
            
            <br />
            
            {filterTask.length === 0 ?(
              <h3 className={`no_task_found_msg ${darkTheme ? "dark" : ""}`}>No Task Found!</h3>
            )
            :
            (
              filterTask.map((task) => {
                return(
                       
                  <div key={task.id} className='task_card'>                  
                    <div id='task_content'>
                      <p id='task_content_txt' onClick={() => handleComplete(task.id)} style={{textDecoration: task.completed ? "line-through" : "none", cursor: "pointer"}} className={`${darkTheme ? "dark" : ""}`}>
                        {task.pinned && "📌"}
                        {task.content.length > 50 ? task.content.slice(0, 50) + "....." : task.content}
                      </p>

                      <div id='date_and_btn_div'>
                        <p id='due_date' className={`${darkTheme ? "dark" : ""}`}>Due Date: {task.dueDate}</p>
                        
                        <div id='task_btn'>
                          <button id='task_pin_btn' className='task_btns' onClick={() => handlePin(task.id)} title='Pin Task'>
                            <img src={darkTheme ? darkPin : pin} alt="pin" width={28} height={28} style={{opacity: task.pinned ? 0.3 : 1}}/>
                          </button>
                          <Link to={`/create/?taskId=${task?.id}`}>
                            <button id='task_edit_btn' className='task_btns' title='Edit Task'>
                              <img src={darkTheme ? darkEdit : edit} alt="edit" width={25} height={25}/>
                            </button>
                          </Link>
                          <Link to={`/viewTask/${task?.id}`}>
                            <button id='task_view_btn' className='task_btns'title='View Task'>
                              <img src={darkTheme ? darkView : view} alt="view" width={25} height={25}/>
                            </button>
                          </Link>
                          <button id='task_copy_btn' className='task_btns' onClick={() => handleCopy(task.content)} title='Copy Task'>
                            <img src={darkTheme ? darkCopy : copy} alt="copy" width={25} height={25}/>
                          </button>
                          <button id='task_delete_btn' className='task_btns' onClick={() => handleDelete(task)} title='Delete Task'>
                            <img src={darkTheme ? darkDelete : trash} alt="delete" width={20} height={20}/>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                )                
              })
            )}
          </>
        )
      }
    </div>
  )
}

export default Tasks