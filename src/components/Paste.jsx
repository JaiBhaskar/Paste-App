import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Paste = () => {

  const pastes = useSelector((state)=> state.paste.pastes);

  const[searchTerm, setSearchTerm]= useState('');

  const dispatch= useDispatch();

  const filteredData = pastes.filter((paste)=> paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId){
      dispatch(removeFromPastes(pasteId))
  }

  return (
    <div>
      <input 
      className='p-2 rounded-2xl min-w-[600px] mt-5' 
      type="search"
      placeholder="search here"
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}
       />
       <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length>0 && filteredData.map(
            (paste)=>(
              <div key={paste._id} className='border p-3 rounded text-center bg-gray-800 '>
                <div>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                    Edit
                    </a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                    View</a>
                  </button>
                  {/* <Link to={`/pastes/${paste?._id}`} className='px-3 py-1 bg-[#1a1a1a] text-white rounded-2xl'> {/Link}*/}
                  <button onClick={()=>handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={()=> {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to Clipboard")
                  }}>
                    Copy
                  </button>
                  {/*HomeWork: Write share logic */}
                  <button onClick={async()=>{
                    try{
                      const shareData={
                        title: paste.title , text: paste.content, /*url: window.location.href, note that this will work on proper HTTPS website */
                      }

                      await navigator.share(shareData);
                      toast.success('Content shared successfully');
                    }
                    catch(error){
                      console.log('Error Sharing:', error);
                      toast.error('Sharing failed or Cancelled')
                    }
                  }}>
                    Share
                  </button>
                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          )
        }
       </div>
    </div>
  )
}

export default Paste
