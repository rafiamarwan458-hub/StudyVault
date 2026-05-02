import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import TasksSlice from "./TasksSlice";

export const store = configureStore({
    reducer: {
        notes: NotesSlice,
        tasks: TasksSlice
    }
});