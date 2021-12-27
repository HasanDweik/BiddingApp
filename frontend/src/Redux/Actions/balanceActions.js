import { ActionTypes } from '../Constants/action-types';

export const setBalance = (form) => {
	return {
		type: ActionTypes.SET_BALANCE,
		payload: form,
	};
};
