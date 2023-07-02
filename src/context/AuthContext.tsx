import React, { useContext, createContext, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getUser } from '../utils/requests';

const INITIAL_STATE = {
	currentUser: null,
	userIsLoading: true,
};

const AuthContext = createContext<any>(INITIAL_STATE);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	const fetchUser = async (id: any) => {
		const user = await getUser(id);
		dispatch({ type: 'LOGIN', payload: user });
		dispatch({ type: 'USER_IS_LOADING', payload: false });
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				fetchUser(currentUser.uid);
			} else {
				dispatch({ type: 'LOGOUT' });
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser: state.currentUser, isLoading: state.userIsLoading, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

// AuthReducer
const AuthReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, currentUser: action.payload };
		case 'LOGOUT':
			signOut(auth);
			return { ...state, currentUser: null };
		case 'USER_IS_LOADING':
			return { ...state, userIsLoading: action.payload };
		default:
			return state;
	}
};
