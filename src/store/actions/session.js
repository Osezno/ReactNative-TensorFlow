import { SET_AUTH_USER, SET_SESSION_ERROR, SET_INIT_SESSION } from './types';
import { CLEARSTORE } from './types';
// import Firebase from 'config/Firebase';

//import * as ACTIONS from '../../store/actions';



export const setAuthUser = user => {
    return {
        type: SET_AUTH_USER,
        payload: user
    }
}



export const clearStore = () => {
    return {
        type: CLEARSTORE,
    }
}


export const fetchAuthUser = () => async dispatch => {
    try {
        if (localStorage.length) {
            let session = {}
            session['id_estatus'] = localStorage.getItem('id_estatus');
            session['onboard'] = localStorage.getItem('onboard');
            session['id_rol'] = localStorage.getItem('id_rol');
            session['token'] = localStorage.getItem('token');
            session['uuid'] = localStorage.getItem('uuid');
            dispatch(setAuthUser(session));
        }
    } catch {
        console.log("error")
        // ignore write errors
    }

}


export const signIn = (session) => async dispatch => {
    try {

        localStorage.setItem('id_estatus', session.id_estatus);
        localStorage.setItem('onboard', session.onboard);
        localStorage.setItem('id_rol', session.id_rol);
        localStorage.setItem('token', session.token);
        localStorage.setItem('uuid', session.uuid);
    } catch {
        console.log("error")
        // ignore write errors
    }
    dispatch(setAuthUser(session));
}


export const signOut = () => async dispatch => {
    // Firebase.auth.signOut();
    localStorage.clear();
    dispatch(clearStore());
    //dispatch(setAuthUser({ token: null, uuid: null }));
}
