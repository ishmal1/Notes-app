import React, { useRef } from 'react'
import { useMutation } from 'react-query';
import api from '../api/notes'

export default function Card({
  
    id,
    text,
    date,
    color,
    refreshNotes
}) {
  
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess:()=> {
    queryClient.invalidateQueries('notes');

    },
    onError : (error)=>{
      console.log("error deleting note: ", error.message)
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess:()=> {
     queryClient.invalidateQueries('notes');

    },
    onError : (error)=>{
      console.log("error updating note: ",JSON.stringify(error))
    }
  })

    const formattedDate = new Date(date).toLocaleDateString();
    const textRef = useRef(null)

    function updateNote({id, value}){
      return api.patch(`/notes/${id}`, { text: value })
      .then(response => response.data) 
      .catch(error => console.error('Error updating note:', error.message))
    }

    function handleUpdate(id, value){
      updateMutation.mutate({id, value})
    }

     function deleteNote(id) {
      return api.delete(`/notes/${id}`)
      .then(Response => Response.data)
      .catch(error=>  console.error('Error deleting note:', error.message))
      
     
     }

     function handleDelete(id){
      deleteMutation.mutate(id)
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
    onClick={()=>handleUpdate(id, textRef.current.value)} >
    save
    </button>
    <button 
    className='w-full rounded-full p-2  bg-black text-white  hover:bg-zinc-900  '
    onClick={()=>{handleDelete(id)}}>
    delete
    </button>
    </div>
    </footer>
    </div>
    </>
  )
}