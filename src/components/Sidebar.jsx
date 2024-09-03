import React from 'react'
import { useState} from 'react';
import api from '../api/notes'
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar({refreshNotes}) {
    
const [open, setOpen] =useState(false);

  const colors =[
    "#fa7154",
    "#ff5e5e", 
    "#FED54A",
    "#E1A2B8",
    "#1B98F5",
    "#50DBB4",
    "#35BDD0",
    "#CAD5E2",]
    
   
  
    const addNewNote =  async(color) => {
      const id = new Date().getTime();
        const newNote = {
          noteId: id,
          text: "",
          date: new Date(),
          color: color,
        };
        const request = {
          _id: uuidv4(),
          ...newNote
        }
      
        
    try {
      const response = await api.post('/note', request);
      console.log('Note added successfully:', response.data);
      refreshNotes(); 
    } catch (error) {
      console.log('Error adding note:', error.response ? error.response.data : error.message);
    }
      };
    
  return (
    <>
    <div className='icon flex md:flex-col gap-2 lg:mr-20'>

      <button 
      onClick={()=>{setOpen(!(open))}}
      className=' bg-black shadow-md shadow-gray-500 md:ml-8  justify-center rounded-full md:px-3 px-3 py-2 md:py-3 transition-transform md:w-12 md:h-12 '>
      <FontAwesomeIcon 
      icon={faPlus} size='lg' color='white'
      className={`transition-transform duration-300 ${
        open ? 'rotate-45' : 'rotate-0'
      }`}
      /> 
      </button>
      {open && (<div className='flex md:flex-col md:flex-wrap justify-center md:ml-10 md:mt-5 mt-3 gap-2 colors '>
        {colors.map((color,index)=>{
          return <div 
          key={index}
          className='rounded-full border-slate-600 border-2 border-opacity-20 shadow-md hover:shadow-xl shadow-gray-500 p-2 cursor-pointer md:w-6 w-3 md:h-6 h-3 '
          style={{backgroundColor : color}}
          onClick={()=>{addNewNote(color)}}
         >
          </div>
        })}
      </div>)}
        </div>
    </>
  )

}