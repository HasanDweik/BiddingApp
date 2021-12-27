import { ActionTypes } from '../Constants/action-types';

const initialState = {
	balance: '991123',
};

export const balanceReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_BALANCE:
			return {
				...state,
				balance: payload.balance,
			};
		default:
			return { ...state };
	}
};
