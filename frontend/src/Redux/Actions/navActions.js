import { ActionTypes } from '../Constants/action-types';

export const setNav = (nav) => {
	return {
		type: ActionTypes.SET_NAV,
		payload: nav,
	};
};
