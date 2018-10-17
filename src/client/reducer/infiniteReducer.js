import * as types from '../actions/actionTypes';
const initialState = {
  username: '',
  role: '',
  password: '',
  firstname: '',
  lastname: '',
  notStarted: [],
  inProgress: [],
  closed: [],
  currentPage: 'login',
  user_id: 0,
  problem: '',
  expect: '',
  tried: '',
  suspect: '',
  topic: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_USERNAME: {
      const newState = Object.assign({}, state);
      newState.username = action.payload.target.value;
      return newState;
    }
    case types.CREATE_ROLE: {
      const newState = Object.assign({}, state);
      newState.role = action.payload.currentTarget.value;
      return newState;
    }
    case types.CREATE_PASSWORD: {
      const newState = Object.assign({}, state);
      newState.password = action.payload.target.value;
      return newState;
    }
    case types.CREATE_FIRSTNAME: {
      const newState = Object.assign({}, state);
      newState.firstname = action.payload.target.value;
      return newState;
    }
    case types.CREATE_LASTNAME: {
      const newState = Object.assign({}, state);
      newState.lastname = action.payload.target.value;
      return newState;
    }
    case types.ON_LOGIN_SUBMIT: {
      const newState = Object.assign({}, state);
      //TODO:
    }
    case types.ON_SIGNUP_SUBMIT: {
      const newState = Object.assign({}, state);
      //TODO:
    }
    case types.TOGGLE_PAGE: {
      
      const newState = Object.assign({}, state);
      if(newState.currentPage = 'login'){
        newState.currentPage = 'signup'
      }
      if(newState.currentPage = 'signup'){
        newState.currentPage = 'login'
      }
      return newState;
    }
    case types.ON_PROBLEM: {
      const newState = Object.assign({}, state);
      newState.problem = action.payload.target.value;
      return newState;
    }
    case types.ON_EXPECT: {
      const newState = Object.assign({}, state);
      newState.expect = action.payload.target.value;
      return newState;
    }
    case types.ON_SUSPECT: {
      const newState = Object.assign({}, state);
      console.log(action,'on suspect')
      newState.suspect = action.payload;
      return newState;
    }
    case types.ON_TRIED: {
      const newState = Object.assign({}, state);
      newState.tried = action.payload.target.value;
      return newState;
    }
    case types.ON_TOPIC: {
      const newState = Object.assign({}, state);
      console.log(action.payload.target.value,'in reducer')
      newState.topic = action.payload.currentTarget.value;
      return newState;
    }
    case types.CHANGE_STATUS: {
      const newState = Object.assign({}, state);
      // fetch request, send all the problem/suspect/tried/topic to database
      
    }
    case types.ON_SIGNUP_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.currentPage = 'home';
      return newState;
    }
    case types.ON_SIGNUP_FAIL: {
      const newState = Object.assign({}, state);
      newState.currentPage = 'login';
      return newState;
    }
    case types.ON_LOGIN_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.currentPage = 'home';
      return newState;
    }
    case types.ON_LOGIN_FAIL: {
      const newState = Object.assign({}, state);
      newState.currentPage = 'login';
      return newState;
    }

    case types.UPDATE_CLOSED: {
      const newState = Object.assign({}, state);
      newState.closed = action.payload;
      return newState;
    }
    case types.UPDATE_UNCLAIMED: {
      const newState = Object.assign({}, state);
      newState.notStarted= action.payload;
      return newState;
    }
    case types.UPDATE_CLAIMED: {
      const newState = Object.assign({}, state);
      newState.inProgress = action.payload;
      return newState;
    }
    case types.SAVE_LOGIN_INFO:{
      const newState = Object.assign({}, state);
      console.log(action.payload, 'payload')
      newState.firstname = action.payload.firstname;
      newState.lastname = action.payload.lastname;
      newState.user_id = action.payload.user_id;
      newState.role = action.payload.role;
      return newState;
    }

    default:
      return state;
  }
}

