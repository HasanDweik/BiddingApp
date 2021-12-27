import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { balanceReducer } from './balanceReducer';
import { navReducer } from './navReducer';

const reducers = combineReducers({
	user: userReducer,
	balance: balanceReducer,
	nav: navReducer,
});
export default reducers;
