import React, { useContext, createContext, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getUser } from '../utils/requests';

const INITIAL_STATE = {
	currentUser: null,
};

const AuthContext = createContext<any>(INITIAL_STATE);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	// const getUser = async (id: string) => {
	// 	const docRef = doc(db, 'users', id);
	// 	const docSnap = await getDoc(docRef);
	// 	if (docSnap.exists()) {
	// 		console.log('Document data:', docSnap.data());
	// 		dispatch({ type: 'LOGIN', payload: docSnap.data() });
	// 	} else {
	// 		// doc.data() will be undefined in this case
	// 		console.log('No such document!');
	// 	}
	// };

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const user = await getUser(currentUser.uid);
				dispatch({ type: 'LOGIN', payload: user });
			} else {
				dispatch({ type: 'LOGOUT' });
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>{children}</AuthContext.Provider>;
};

// AuthReducer
const AuthReducer = (state: any, action: any) => {
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
