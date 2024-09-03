import React, { useRef } from 'react'
import api from '../api/notes'

export default function Card({
  
    id,
    text,
    date,
    color,
    refreshNotes
}) {
  
    const formattedDate = new Date(date).toLocaleDateString();
    const textRef = useRef(null)

    const updateNote =async(id, value)=>{
      await api.patch(`/note/${id}`, {text: value})
      refreshNotes()
      }

    async function deleteNote(id) {
      await api.delete(`/note/${id}`)
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
     {formattedDate} 
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

