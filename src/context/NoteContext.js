import { useContext } from "react";
import { createContext } from "react";

export const NotesContext= createContext(
    {
        notes:[
            {
                id:1,
                note:"New Note",
                date:"1/2/2024",
                color: 'orange'
            }
        ],
        addNote: (id, note, color)=>{},
        deleteNote: (id)=>{},
        updateNote: (id, note)=>{}
    }
)

export const useNotes = ()=>{
   return useContext(NotesContext)
}

export const NotesProvider= NotesContext.Provider