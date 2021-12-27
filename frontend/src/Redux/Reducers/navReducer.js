import { ActionTypes } from '../Constants/action-types';

const initialState = {
	nav: 'HOME',
};

export const navReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_NAV:
			return {
				...state,
				nav: payload,
			};
		default:
			return { ...state };
	}
};
