import { useState } from 'react'

import './App.css'
import { NotesProvider } from './context/NoteContext'

function App() {

  const [notes, setNotes]=useState([])
  const [isOpen, setIsOpen]=useState(true)
 
  const color =[  
    "F7ECDE",
    "#FF9F4A",
    "#FED54A",
    "#E1A2B8",
    "#1B98F5",
    "#50DBB4",
    "#35BDD0",
    "#CAD5E2",
    "#EDBF69",]

  const addNote =()=>{
    setNotes((prev)=>[{id : Date.now, ...note},...prev])
  }

  

  return (
    <NotesProvider value={{notes, addNote}}>
      <div className='flex md:flex-col'>
        <aside className='fixed flex flex-col items-start'>
          <div className='text-2xl font-bold text-black capitalize mt-5 mb-5'>notes</div>
          <div className="mt-3 ml-2 md:mt-0 md:ml-0 flex flex-row md:flex-col items-start md:items-center md:justify-center md:gap-5">
          <button 
          className='text-2xl  text-white bg-black rounded-full px-4 py-2 mb-5'
          onClick={()=>setIsOpen(!isOpen)}>{(isOpen)? '+': 'x'}</button>
          {isOpen && (<div className='flex md:flex-col'>
            {color.map((color, index)=>{
              <div 
              key={index} 
              className='rounded-full w-4 h-4 cursor-pointer'
              style={{backgroundColor : color}}
              onClick={()=>{
               addNote(color)
              console.log(index)
              }}
              >
              </div>
            })}
          </div>)}
          </div>
        </aside>
      </div>
    </NotesProvider>
  )
}

export default App
