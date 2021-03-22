import { ADD_TOAST, REMOVE_TOAST } from '../actions/types';
import { updateObject } from "../utility";

const INITIAL_STATE = { 
    open:false,
    message:'',
    success:true
};

export default function toasts(state = INITIAL_STATE, action) {
    const {payload, type } = action;
    switch (type) {
        case ADD_TOAST:
            return updateObject(state, payload );
        case REMOVE_TOAST:
            return  state;

        default:
            return state;
    }
}