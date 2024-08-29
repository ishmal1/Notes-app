import React, {useState,useEffect, useRef } from 'react'

export default function Card({
  
    id,
    text,
    date,
    color,
    refreshNotes
}) {
  
    const textRef = useRef(null)

    const updateNote =(id, value)=>{
      const savedNotes = localStorage.getItem('notes')
      const note = savedNotes? JSON.parse(savedNotes): [];
      const updatedNote = note.map((note)=> note.noteId ===id ? {...note, text: value}: note)
      
      localStorage.setItem('notes', JSON.stringify(updatedNote))
      refreshNotes()
      }

    function deleteNote(id) {
      const savedNotes = localStorage.getItem('notes')
      const note = savedNotes? JSON.parse(savedNotes): [];

      const notesAfterDeletion = note.filter((note)=>note.noteId !== id)

      localStorage.setItem('notes', JSON.stringify(notesAfterDeletion))
      refreshNotes()
     }
    
  return (
        
    
    <>
    <div className=' card_container rounded-xl border-2 flex flex-col justify-around gap-2 shadow-lg shadow-gray-500 border-none md:p-5 p-3'
    style={{backgroundColor: color}}> 
    <textarea name="" id="" 
    placeholder='Write here...'
    ref={textRef}
    defaultValue={text}
    className=' scroll-none overflow-hidden w-full h-40 bg-transparent rounded-md resize-none outline-none focus:outline-none p-2'>
    </textarea>
    <footer className='w-full flex mt-auto justify-between'>
    <div className=' w-full mt-2'>
     {date} 
     {console.log(date)}
    </div>
    <div className=' w-full space-x-4 inline-flex'>
    <button 
    className=' w-full rounded-full p-2 bg-black text-white  hover:bg-zinc-900'
    onClick={()=>updateNote(id, textRef.current.value)} >
    save
    </button>
    <button 
    className='w-full rounded-full p-2  bg-black text-white  hover:bg-zinc-900  '
    onClick={()=>{deleteNote(id)}}>
    delete
    </button>
    </div>
    </footer>
    </div>
    </>
  )
}

