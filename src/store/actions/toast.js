import { ADD_TOAST, REMOVE_TOAST } from './types';


export const addToast = toast => {
    return {
        type: ADD_TOAST,
        payload: toast
    }
}
export const removeToast = ()=> {
    return {
        type: REMOVE_TOAST,
    }
}





