import { combineReducers } from 'redux';
import { CLEARSTORE } from '../actions/types';


import session from './session';
import toast from './toast';

 const appReducer = combineReducers({
    sessionState: session,
    toastState:toast
});

const rootReducer = (state, action) => {

  if (action.type === CLEARSTORE ) {
    state = { 
      sessionState:{
        authUser: {id_estatus: null, onboard: null, id_rol: null, token: null, uuid: null}
      },
      toastState:{
        open:false,
        message:'',
        success:false
      }
    };
  }

  return appReducer(state, action);
};

export default  rootReducer
