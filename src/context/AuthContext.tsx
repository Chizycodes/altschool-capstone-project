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

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	const fetchUser = async (id: any) => {
		const docRef = doc(db, 'users', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			dispatch({ type: 'LOGIN', payload: docSnap.data() });
			dispatch({ type: 'USER_IS_LOADING', payload: false });
		} else {
			console.log('No such document!');
		}
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
		<AuthContext.Provider value={{ currentUser: state.currentUser, userIsLoading: state.userIsLoading, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);

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
