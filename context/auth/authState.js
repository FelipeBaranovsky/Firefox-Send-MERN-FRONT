import React, {useReducer} from 'react';
import authContext from './authContext';
import authReducer from '@/context/auth/authReducer';
import { SUCCESSFULLY_REGISTER, UNSUCCESSFULLY_REGISTER, CLEAN_ALERT, SUCCESSFULLY_LOGIN, UNSUCCESSFULLY_LOGIN, AUTHENTICATED_USER, LOGOUT } from '@/types';
import axiosClient from '@/config/axios';
import tokenAuth from '@/config/tokenAuth';

const AuthState = ({children}) => {
    //Initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : "",
        isAuthenticated: null,
        user: null,
        msg: null
    }

  
    //Reducer
    const [state, dispatch] = useReducer(authReducer, initialState);
   

    const cleanAlert = () => {
        dispatch({
            type: CLEAN_ALERT
        })
    }

    //Register user
    const registerUser = async user => {
        try {
            const response = await axiosClient.post('/api/users', user);
            dispatch({
                type: SUCCESSFULLY_REGISTER,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: UNSUCCESSFULLY_REGISTER,
                payload: error.response?.data?.msg
            })
        }
        //Clean alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    //Authenticate user
    const login = async user => {
        try {
            const response = await axiosClient.post('/api/auth', user);
            dispatch({
                type: SUCCESSFULLY_LOGIN,
                payload: response.data.token
            })
        } catch (error) {
            dispatch({
                type: UNSUCCESSFULLY_LOGIN,
                payload: error.response?.data?.msg
            })
        }

        //Clean alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }



    //User authenticated with jwt
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }
        try {
            const response = await axiosClient.get('/api/auth');
            if(response.data.user){
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                })
            }
        } catch (error) {
            dispatch({
                type: UNSUCCESSFULLY_LOGIN,
                payload: error.response.data.msg
            })
        }            
    }

    //Logout
    const logout = () => {
       dispatch({
           type: LOGOUT
       })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token, 
                isAuthenticated: state.isAuthenticated, 
                user: state.user, 
                msg: state.msg,
                userAuthenticated,
                registerUser,
                login,
                logout,
                cleanAlert
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;