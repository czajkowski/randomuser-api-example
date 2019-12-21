import {
    createReducer
} from 'redux-act';

import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersError,
    changeSearch,
    changeNationality,
    showUserDetails,
    hideUserDetails,
} from '../actions';

import Nationalities from '../../enums/nationalities.json';

// Get first country code on the list
const DefaultNationality = Object.keys(Nationalities)[0];

const initialState = {
    // Initially I wanted to use a flag in the store to indicate that data are being loaded.
    // This would be useful to show a loader.
    // I've used a component (react-infinite-scroller) that handles that internally.
    // I am leaving the flag in case that needs to be changed.
    isLoading: false,

    // All users returned from API for selected Nationality
    allUsers: [],

    filteredUsers: [],

    // Selected user details to display in modal
    userDetails: null,

    error: null,

    // Last loaded page
    page: -1,

    // All available pages
    totalPages: 0,

    // Selected nationality user to filter users
    nationality: DefaultNationality,

    // Search phrase used to filter users
    search: null,
};

const filterUsers = (users, search) => {
    if (!search) {
        return users;
    }

    const searchString = search.toLowerCase();
    return users
        .filter(({ firstName, lastName }) => `${firstName} ${lastName}`
            .toLowerCase()
            .includes(searchString)
        );
}

export default createReducer({
    [fetchUsersStart]: (state) => ({
        ...state,

        isLoading: true,

        error: null,
    }),

    [fetchUsersSuccess]: (state, { page, totalPages, users }) => ({
        ...state,

        isLoading: false,

        allUsers: [...state.allUsers, ...users],
        filteredUsers: [...state.filteredUsers, ...filterUsers(users, state.search)],

        page,
        totalPages,
    }),

    [fetchUsersError]: (state, error) => ({
        ...state,

        isLoading: false,

        error,
    }),

    [changeSearch]: (state, value) => ({
        ...state,

        // Fund users again in available user list
        filteredUsers: [...filterUsers(state.allUsers, value)],

        search: value,
    }),

    [changeNationality]: (state, value) => ({
        ...state,

        // Clears all data.
        // Starts fetching data all over again.
        allUsers: [],
        filteredUsers: [],

        error: null,

        page: -1,
        totalPages: 0,

        nationality: value,
    }),

    [showUserDetails]: (state, userId) => {
        const user = state.allUsers.find(({ id }) => id === userId);

        return {
            ...state,

            userDetails: user,

            error: user ? null : 'Unable to find user!',
        };
    },

    [hideUserDetails]: (state) => ({
        ...state,

        userDetails: null,
    }),
}, initialState);
