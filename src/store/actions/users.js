import { createAction } from 'redux-act';

import randomuserApi from '../../randomuser.api';

export const fetchUsersStart = createAction('Fetch user data - Start');
export const fetchUsersSuccess = createAction('Fetch user data - Success');
export const fetchUsersError = createAction('Fetch user data - Error');

export const fetchUsers = (page) => {
    return (dispatch, getState) => {
        dispatch(fetchUsersStart());

        const {
            users: {
                nationality,
            },
        } = getState();

        return randomuserApi
            .getUsers(page, {
                nationality,
            })
            .then((response) => {
                dispatch(fetchUsersSuccess(response));
            })
            .catch((error) => {
                dispatch(fetchUsersError.asError("Error fetching users!"));
            });
    };
};

export const changeSearch = createAction('Change search');
export const changeNationality = createAction('Change nationality');

export const hideUserDetails = createAction('Hide user details');
export const showUserDetails = createAction('Show user details');
