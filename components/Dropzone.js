import React, {useCallback, useContext, useEffect} from 'react';
import { useDropzone } from "react-dropzone";
import axiosClient from '@/config/axios';
import appContext from '@/context/app/appContext';
import authContext from '@/context/auth/authContext';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import FileForm from './FileForm';

const Dropzone = () => {

    const AppContext = useContext(appContext)
    const {rejectFile, uploadFile, loading, createLink} = AppContext

    const AuthContext = useContext(authContext)
    const {user, isAuthenticated} = AuthContext
    
    const onDropRejected = () => {
        rejectFile('File too large')
        toast.error('File too large. The limit is 1 MB, get a free account to upload larger files', {autoClose: 5000})
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        
        const formData = new FormData();
        formData.append('file', acceptedFiles[0])

        uploadFile(formData, acceptedFiles[0].path)

    }, [])

    
    //Extract dropzone content
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});
    
    const files = acceptedFiles.map(file => (
        <li key={file.lastModified} className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
            <p className='font-bold text-xl'>{file.path}</p>
            <p className='text-sm text-gray-500'>{(file.size / Math.pow(1024,2)).toFixed(2)} MB</p>
        </li>
    ))

  return (
    <div className='md:flex-1 px-4 rounded-lg mb-3 mx-2 my-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100'>
        
        { acceptedFiles.length > 0 ? (
            <div className='mt-10 w-full'>
                <h4 className='text-2xl font-bold text-center mb-4'>Files</h4>
                <ul>
                    {files}
                </ul>
                {isAuthenticated ? (
                    <FileForm/>
                ):(
                    <></>
                )}
                {loading ? 
                    <Spinner />
                :(
                    <button className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800' type='button' onClick={() => createLink()}>
                        Create Link
                    </button>
                )}
            </div>
        ) : (
            <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                <input className='h-100' {...getInputProps()} />
                <div className='text-center '>
                    {
                        isDragActive ? <p className='text-2xl text-center text-gray-600'>Just drop it...</p> : 
                        <div className='text-center'>
                            <p className='text-2xl text-center text-gray-600'>Select a file and drag it here...</p>
                            <button className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800' type='button'>
                                Select a file to upload
                            </button>
                        </div>
                    }
                </div>
            </div>
        )}
        
        
    </div>
  )
}

export default Dropzone