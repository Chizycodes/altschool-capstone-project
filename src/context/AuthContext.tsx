import React, { useContext, createContext, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { UserModel } from '../utils/models';

const INITIAL_STATE = {
	currentUser: null,
};

const AuthContext = createContext<any>(INITIAL_STATE);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			dispatch({ type: 'LOGIN', payload: currentUser });
			console.log(currentUser, 'user');
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>{children}</AuthContext.Provider>;
};

// AuthReducer
const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, currentUser: action.payload };
		case 'LOGOUT':
			signOut(auth);
			return { ...state, currentUser: null };
		default:
			return state;
	}
};
