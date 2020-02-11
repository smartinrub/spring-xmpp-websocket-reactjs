import env from '../../env';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const fetchUsersError = error => ({
  type: FETCH_USERS_ERROR,
  error: error
});

async function callApi({ path, method }) {
  const res = await fetch('http://' + env.hostname + path, {
    method: method
  });

  if (res.status >= 300) {
    throw new Error(`Response status is ${res.status}`);
  }

  return res.json().then(users => users);
}

export const fetchUsers = username => dispatch => {
  try {
    callApi({
      path: '/users/' + username,
      method: 'GET'
    }).then(users => {
      dispatch(fetchUsersSuccess(users));
    });
  } catch (err) {
    console.log(err);
    dispatch(fetchUsersError(err));
  }
};
