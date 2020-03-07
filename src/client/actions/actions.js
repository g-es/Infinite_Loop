import * as types from './actionTypes';

export const createUsername = event => ({
  type: types.CREATE_USERNAME,
  payload: event,
});

export const createRole = event => ({
  type: types.CREATE_ROLE,
  payload: event,
});

export const createPassword = event => ({
  type: types.CREATE_PASSWORD,
  payload: event,
});
export const createFirstname = event => ({
  type: types.CREATE_FIRSTNAME,
  payload: event,
});
export const createLastname = event => ({
  type: types.CREATE_LASTNAME,
  payload: event,
});

export const updateUnclaimed = arr => ({
  type: types.UPDATE_UNCLAIMED,
  payload: arr,
});
export const updateClaimed = arr => ({
  type: types.UPDATE_CLAIMED,
  payload: arr,
});
export const updateClosed = arr => ({
  type: types.UPDATE_CLOSED,
  payload: arr,
});


// a function to get listing, which will be used several times
export const fetchData = (dispatch) => {
  const notStarted = [];
  const inProgress = [];
  const closed = [];
  fetch('http://localhost:3000/home', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((posts) => {
      return posts.json();
    })
    .then((posts) => {
      posts.forEach((post) => {
        if (post.status === 'unclaimed') {
          notStarted.push(post);
        }
        if (post.status === 'claimed') {
          inProgress.push(post);
        }
        if (post.status === 'closed') {
          closed.push(post);
        }
      });
      dispatch(updateUnclaimed(notStarted));
      dispatch(updateClaimed(inProgress));
      dispatch(updateClosed(closed));
    })
    .catch(error => console.log(error, 'err in fetchDT'));
};

export const onSignupSubmit = ({
  username,
  password,
  role,
  firstname,
  lastname,
}) => {
  // type: types.ON_SIGNUP_SUBMIT,
  // payload: {user, pass, role},
  // requires thunk TODO:
  if (role === 'helper') {
    role = 2;
  } else {
    role = 1;
  }
  return function (dispatch) {
    return fetch('http://localhost:3000/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        role,
        firstname,
        lastname,
      }),
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res, 'signup return data');
        // if (res.status === 200) {
          dispatch(signUpSuccess(res.user_id));
          fetchData(dispatch);
        // } 
        // else dispatch(signUpFail());
      });
  };
};
export const saveLoginInfo = data => ({
  type: types.SAVE_LOGIN_INFO,
  payload: data,
});

export const onLoginSubmit = (user, pass) => function LoginSubmit(dispatch) {
  return fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  })

    .then((res) => {
      if (res.status === 200) {
        dispatch(loginSuccess());
        fetchData(dispatch);
      } else dispatch(loginFail());
      return res;
    })
    .then(res => res.json())
    .then((res) => {
      dispatch(saveLoginInfo(res[0]));
    });
};

export const signUpSuccess = (id) => ({
  type: types.ON_SIGNUP_SUCCESS,
  payload: id,
});

export const signUpFail = () => ({
  type: types.ON_SIGNUP_FAIL,
});
export const loginSuccess = () => ({
  type: types.ON_LOGIN_SUCCESS,
});

export const loginFail = () => ({
  type: types.ON_LOGIN_FAIL,
});


export const onProblem = event => ({
  type: types.ON_PROBLEM,
  payload: event,
});

export const onExpect = event => ({
  type: types.ON_EXPECT,
  payload: event,
});

export const onTried = event => ({
  type: types.ON_TRIED,
  payload: event,
});

export const onSuspect = event => ({
  type: types.ON_SUSPECT,
  payload: event,
});
export const onTopic = event => ({
  type: types.ON_TOPIC,
  payload: event,
});

export const changeStatus = (userid, postStatus, postid, role) => {
  if (postStatus === 'unclaimed') postStatus = 1;
  if (postStatus === 'claimed') postStatus = 2;
  if (postStatus === 'closed') postStatus = 3;
  return dispatch => fetch('http://localhost:3000/status', {
    headers: {
      'Content-Type': 'application/json',
      //       "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods ": "GET, POST, HEAD, PATCH, DELETE",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
    method: 'POST',
    body: JSON.stringify({
      user_id: userid,
      status: postStatus,
      post_id: postid,
      role,
    }),
  })
    .then((res) => {
      if (res.status === 200) fetchData(dispatch);
    })
    .catch(err => console.log(err, 'errrr'));
};


export const togglePage = () => ({
  type: types.TOGGLE_PAGE,
});

export const onCreateSectionSubmit = (user_id, problem, expect, tried, suspect, topic) => function createSectionSubmit(dispatch) {
  return fetch('http://localhost:3000/createpost', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      // status: postStatus,
      // postid: postid,
      user_id,
      problem,
      expect,
      tried,
      suspect,
      topic,
      // createdby, resolvedby, problem, expect, tried, suspect, topic
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        fetchData(dispatch);
        dispatch({ type: types.ON_CREATESECTION_SUBMIT });
      }
    })
    // .then(fetchData(dispatch))
    // .then(dispatch({ type: types.ON_CREATESECTION_SUBMIT }))
    .catch(error => console.log(error, 'err in submit'));
};
