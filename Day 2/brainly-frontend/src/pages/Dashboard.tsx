import { useState } from 'react'

import { Button } from '../Components/ui/Button'
import { PlusIcon } from '../icons/Plus'
import { ShareIcon } from '../icons/Share'


import '../App.css'
import '../index.css' 
import { Card } from '../Components/ui/Card'
import { CreateContentModal } from '../Components/ui/CreateContentModal'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useFetchContent } from '../CustomHook/useFetchContent'
import { Link } from 'react-router-dom'

// on opening of dashboard i'sud retrieve contents already added by user .

export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false);

  const { content: contents, loading, error, username } = useFetchContent();

  return <div className='bg-slate-300 h-full w-screen'>
   <div className=' '>
    <CreateContentModal open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }}/>
    <p>Hey {username}, welcome to Second Brain .</p>
    <div className='flex justify-end gap-2 p-3 '>
    <Button onClick={ ()=>{
      setModalOpen(true);
    }} variant='primary' text='Add Content' size='sm' startIcon={<PlusIcon/>} endIcon={""} />
    <Button variant='secondary' text='Share Dashboard' size='sm' startIcon={<ShareIcon/>} endIcon={""}/>
    </div>
    {loading && <p>Loading...</p>}
    {error && <div className='flex flex-wrap gap-2 mx-4 p-4 border-3 border-dashed border-white'> {error} </div>}

    {!loading && !error && <div className='flex flex-wrap gap-2 mx-4 p-4 border-3 border-dashed border-white'>
      {contents.map(({title,link,type}) => <Card title={title} link={link} type={type} />)}
    </div>}
  </div>
  </div>
  
}


