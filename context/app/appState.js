import React, {useReducer} from 'react'
import appContext from './appContext'
import appReducer from './appReducer'
import {ADD_DOWNLOADS,ADD_PASSWORD,SHOW_ALERT,CLEAN_ALERT,SUCCESSFULLY_UPLOAD_FILE,UNSUCCESSFULLY_UPLOAD_FILE,SUCCESSFULLY_CREATE_LINK,UNSUCCESSFULLY_CREATE_LINK,UPLOAD_FILE,CLEAN_STATE} from '@/types'
import axiosClient from '@/config/axios'
import { toast } from 'react-toastify'

const AppState = ({children}) => {

    //Initial state
    const initialState = {
        msg_file: null,
        name: null,
        original_name: null,
        loading: null,
        downloads: null,
        password: null,
        author: null,
        url: null,
    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    //Show error message
    //TODO: Delete
    const rejectFile = msg => {
        dispatch({
            type: UNSUCCESSFULLY_UPLOAD_FILE,
            payload: msg
        })
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    //Upload file to server
    const uploadFile = async (formData, originalName) => {
        
        dispatch({
            type: UPLOAD_FILE
        })
        try {
            const response = await axiosClient.post('/api/files', formData)
            dispatch({
                type: SUCCESSFULLY_UPLOAD_FILE,
                payload: {
                    name: response.data.file,
                    original_name: originalName
                }
            })
        } catch (error) {
            dispatch({
                type: UNSUCCESSFULLY_UPLOAD_FILE,
                payload: error.response?.data?.msg
            })
            toast.error("Error uploading the file...")
        }
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    //Create a link
    const createLink = async () => {
        const link = {
            name: state.name,
            name_original: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const response = await axiosClient.post('/api/links', link)
            dispatch({
                type: SUCCESSFULLY_CREATE_LINK,
                payload: response.data.msg
            })
            toast.success("Link created successfully!")
        } catch (error) {
            toast.error("Error creating the link...")
            dispatch({
                type: UNSUCCESSFULLY_CREATE_LINK,
                payload: error.response?.data?.msg
            })
        }
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    //Clean State
    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }

    //Add password
    const addPassword = (password) => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    //Add downloads
    const addDownloads = (downloads) => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

    return (
        <appContext.Provider
            value={{
                msg_file: state.msg_file,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                rejectFile,
                uploadFile,
                createLink,
                cleanState,
                addPassword,
                addDownloads
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;