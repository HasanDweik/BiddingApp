import { ActionTypes } from '../Constants/action-types';

const initialState = {
	loggedIn: false,
	username: 'hasan7dweik',
	firstName: 'Hasan',
	lastName: 'Dweik',
	email: 'hasan7dweik@live.com',
	token: 'Hasan7!@#',
	id: '',
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.LOGIN:
			return {
				...state,
				loggedIn: true,
				username: payload.username,
				firstName: payload.firstName,
				lastName: payload.lastName,
				email: payload.email,
				id: payload.id,
			};
		case ActionTypes.LOGOUT:
			return {
				...state,
				loggedIn: false,
				username: '',
				token: '',
			};
		default:
			return { ...state };
	}
};
