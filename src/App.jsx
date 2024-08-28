import { useEffect, useState } from 'react'


import Card from './Card';
import Sidebar from './Sidebar';

import './App.css'

function App() {

  const [note, setNote] =useState([])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || []);
    if (savedNotes.length > 0) {
      setNote(savedNotes);
    }
    else [];
  }, []);

  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(note))
  },[note])
  
  return (
    <>
     <aside className=" capitalize md:text-xl text-lg text-black font-bold pt-12 md:px-10 px-7 md:pb-10 pb-5">notes app</aside>
     <div className="wrapper h-full w-full md:px-8 px-7 flex flex-col md:flex-row lg:gap-x-20 gap-x-40 justify-center ">
        <section>
        <Sidebar 
          setNote={setNote}/>
        </section>
        <section className=' w-500 md:flex-wrap flex-nowrap flex md:flex-row flex-col flex-1 md:mt-0 mt-7 justify-start gap-7'>
        {note && note.map((note, index) => (
        <Card 
          key={note.noteId} 
          id={note.noteId}
          color={note.color}
          date={note.date}
          text={note.text}
          setNote={setNote}
          />
        ))}
        </section>
     </div>
    </>
    )
  }
      

          
        

export default App
