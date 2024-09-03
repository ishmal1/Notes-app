import { useEffect, useState } from 'react'

import api from '../src/api/notes'

import Card from './components/Card';
import Sidebar from './components/Sidebar';

import './App.css'

function App() {

  const [notes, setNotes] =useState([])

  useEffect(()=>{
    retrieveNotes()
  },[])

  async function retrieveNotes() {
    try {
      const response = await api.get('/note'); 
      const savedNotes = response.data;
      if (Array.isArray(savedNotes)) setNotes(savedNotes);
      else console.error('Notes data is not an array:', savedNotes);
  
    } catch (error) {
      console.error('Failed to retrieve notes:', error);
    }
  };
  
  return (
    <>
     <aside className=" capitalize md:text-xl text-lg text-black font-bold pt-12 md:px-10 px-7 md:pb-10 pb-5">notes app</aside>
     <div className="wrapper h-full w-full md:px-8 px-7 flex flex-col md:flex-row lg:gap-x-20 gap-x-40 justify-center ">
        <section>
        <Sidebar 
        refreshNotes={retrieveNotes}/>
        </section>
        <section className=' w-500 md:flex-wrap flex-nowrap flex md:flex-row flex-col flex-1 md:mt-0 mt-7 justify-start gap-7'>
        {Array.isArray(notes) && notes?.map((notes, index) => (
        <Card 
          key={notes._id} 
          id={notes._id}
          color={notes.color}
          date={notes.date}
          text={notes.text}
          refreshNotes={retrieveNotes}
          />
        ))}
        </section>
     </div>
    </>
    )
  }
      

          
        

export default App
