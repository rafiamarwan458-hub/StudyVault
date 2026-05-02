import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]")
};

const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload)
            if(task){
                task.completed = !task.completed
            }
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            if(index !== -1){
                state.tasks[index] = action.payload
            }
        },
        pinTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if(task){
                task.pinned = !task.pinned;
            }
        }
    }
});

export const {addTask, deleteTask, toggleComplete, editTask, pinTask} = TasksSlice.actions;
export default TasksSlice.reducer;