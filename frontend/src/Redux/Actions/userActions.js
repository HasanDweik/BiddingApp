import { ActionTypes } from '../Constants/action-types';

export const login = (form) => {
	return {
		type: ActionTypes.LOGIN,
		payload: form,
	};
};
export const register = (form) => {
	return {
		type: ActionTypes.REGISTER,
		payload: form,
	};
};
export const logout = () => {
	return {
		type: ActionTypes.REGISTER,
	};
};
