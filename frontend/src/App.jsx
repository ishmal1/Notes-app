import { useQuery } from 'react-query';

import api from '../src/api/notes'

import Card from './components/Card';
import Sidebar from './components/Sidebar';

import './App.css'

function App() {

  const {data: notes, isError, isLoading, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: retrieveNotes,
  })

   function retrieveNotes() {
     return api.get('/notes')
     .then(response => response.data)
     .catch (error => console.error('Failed to retrieve notes:', error)) 
  };
  
  return (
    <>
     <aside className=" capitalize md:text-xl text-lg text-black font-bold pt-12 md:px-10 px-7 md:pb-10 pb-5">notes app</aside>
     <div className="wrapper h-full w-full md:px-8 px-7 flex flex-col md:flex-row lg:gap-x-20 gap-x-40 justify-center ">
        <section>
        <Sidebar 
        refreshNotes={refetch}/>
        </section>
        <section className=' w-500 md:flex-wrap flex-nowrap flex md:flex-row flex-col flex-1 md:mt-0 mt-7 justify-start gap-7'>
       { isLoading && (<h1 className='font-bold text-2xl '>Loading...</h1>)}
       { isError && (<h1>{JSON.stringify(error.message)}</h1>)}
        {Array.isArray(notes) && notes?.map((notes, index) => (
        <Card 
          key={notes._id} 
          id={notes._id}
          color={notes.color}
          date={notes.date}
          text={notes.text}
          refreshNotes={refetch}
          />
        ))}
        </section>
     </div>
    </>
    )
  }
      

          
        

export default App
