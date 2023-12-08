import { SUCCESSFULLY_REGISTER, UNSUCCESSFULLY_REGISTER, CLEAN_ALERT, SUCCESSFULLY_LOGIN, UNSUCCESSFULLY_LOGIN, AUTHENTICATED_USER, LOGOUT } from '@/types';

export default (state, action) => {
    switch (action.type) {
        case UNSUCCESSFULLY_LOGIN:
        case UNSUCCESSFULLY_REGISTER: 
            return {
                ...state,
                msg: {
                    content: action.payload,
                    error: true
                },
            }
        case SUCCESSFULLY_REGISTER:
            return {
                ...state,
                msg: {
                    content: action.payload,
                },
            }
        case SUCCESSFULLY_LOGIN:
            typeof window !== 'undefined' ? localStorage.setItem('token', action.payload) : null;
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true
            }
        case CLEAN_ALERT:
            return {
                ...state,
                msg: null
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGOUT:
            typeof window !== 'undefined' ? localStorage.removeItem('token') : null;
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: null
            }
        default:
            return state;
    }
}