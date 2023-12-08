import React, { useState, useContext } from 'react'
import appContext from '@/context/app/appContext'

const FileForm = () => {
    const AppContext = useContext(appContext)
    const {addPassword, addDownloads} = AppContext
    const [isProtected, setIsProtected] = useState(false)
  return (
    <div className='w-full mt-20'>
        <div>
            <label className='text-lg text-gray-800'>Eliminar tras:</label>
            <select 
                className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                onChange={e => addDownloads(parseInt(e.target.value))}
            >
                <option value='' defaultValue disabled>-- Select --</option>
                <option value='1'>1 Download</option>
                <option value='5'>5 Downloads</option>
                <option value='10'>10 Downloads</option>
                <option value='20'>20 Downloads</option>
            </select>
        </div>
        <div className='mt-4'>
        <div className='flex justify-between items-center'>
            <label className='text-lg text-gray-800 mr-2'>Set a password:</label>
            <input 
                type='checkbox' 
                onChange={() => setIsProtected(!isProtected)}
            />

        </div>
            {
                isProtected && (
                    <input 
                        type='password' 
                        className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500' 
                        onChange={e => addPassword(e.target.value)}
                    />
                )
            }

        </div>
    </div>
  )
}

export default FileForm