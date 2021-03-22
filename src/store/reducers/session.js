import { SET_AUTH_USER, SET_SESSION_ERROR, SET_INIT_SESSION } from '../actions/types';
import { updateObject } from "../utility";


const INITIAL_STATE = { 
    authUser: {id_estatus: null, onboard: null, id_rol: null, token: null, uuid: null}
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AUTH_USER: {
            return updateObject(state, { authUser: action.payload, error: null });
        }

        default:
            return state;
    }
}

export default reducer;
