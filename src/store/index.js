import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

export {
    fetchUsers,
    changeSearch,
    changeNationality,
    showUserDetails,
    hideUserDetails,
} from './actions'

export default createStore(combineReducers({
    // We are using only one reducer at the moment.
    // This is prepared to use multiple reducers if the application grows.
    ...reducers,
}), applyMiddleware(thunk));
