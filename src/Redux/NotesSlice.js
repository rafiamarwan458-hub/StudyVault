import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: JSON.parse(localStorage.getItem("notes")) || [],
};

const NotesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
        editNote: (state, action) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            if(index !== -1){
                state.notes[index] = action.payload;
            }
        },
        pinNote: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload);
            if(note){
                note.pinned = !note.pinned;
            }
        }
    }
});

export const {addNote, deleteNote, editNote, pinNote } = NotesSlice.actions;
export default NotesSlice.reducer;