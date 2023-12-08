import {ADD_DOWNLOADS,ADD_PASSWORD,SHOW_ALERT,CLEAN_ALERT,SUCCESSFULLY_UPLOAD_FILE,UNSUCCESSFULLY_UPLOAD_FILE,SUCCESSFULLY_CREATE_LINK,UNSUCCESSFULLY_CREATE_LINK, UPLOAD_FILE,CLEAN_STATE} from '@/types'


export default (state, action) => {
    switch(action.type) {
        case SUCCESSFULLY_CREATE_LINK:
            return {
                ...state,
                url: action.payload
            }
        
        case UNSUCCESSFULLY_UPLOAD_FILE:
            return {
                ...state,
                loading: null,
                msg_file: {
                    content: action.payload,
                    error: true
                }
            }
        case SUCCESSFULLY_UPLOAD_FILE:
            return {
                ...state,
                loading: null,
                name: action.payload.name,
                original_name: action.payload.original_name
            }
        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }
        case CLEAN_ALERT:
            return {
                ...state,
                msg: null
            }
        case CLEAN_STATE:
            return {
                ...state,
                msg_file: null,
                name: null,
                original_name: null,
                loading: null,
                downloads: null,
                password: null,
                author: null,
                url: null,
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
}
