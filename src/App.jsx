import { useEffect, useState } from 'react'


import Card from './Card';
import Sidebar from './Sidebar';

import './App.css'

function App() {

  const [notes, setNotes] =useState([])

  useEffect(()=>{
    refreshNotes()
  },[])
  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem('notes') || []);
  //   if (savedNotes.length > 0) {
  //     setNotes(savedNotes);
  //   }
  //   else [];
  // }, []);

  // useEffect(()=>{
  //   localStorage.setItem('notes', JSON.stringify(notes))
  // },[notes])


  function refreshNotes() {
    const savedNotes = localStorage.getItem('notes');
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(parsedNotes);

  
    console.log(savedNotes)
  };
  
  return (
    <>
     <aside className=" capitalize md:text-xl text-lg text-black font-bold pt-12 md:px-10 px-7 md:pb-10 pb-5">notes app</aside>
     <div className="wrapper h-full w-full md:px-8 px-7 flex flex-col md:flex-row lg:gap-x-20 gap-x-40 justify-center ">
        <section>
        <Sidebar 
        refreshNotes={refreshNotes}/>
        </section>
        <section className=' w-500 md:flex-wrap flex-nowrap flex md:flex-row flex-col flex-1 md:mt-0 mt-7 justify-start gap-7'>
        {notes && notes?.map((notes, index) => (
        <Card 
          key={notes.noteId} 
          id={notes.noteId}
          color={notes.color}
          date={notes.date}
          text={notes.text}
          refreshNotes={refreshNotes}
          />
        ))}
        </section>
     </div>
    </>
    )
  }
      

          
        

export default App
