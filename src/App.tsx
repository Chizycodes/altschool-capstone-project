import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuspendedScreen from './components/general/SuspendedScreen';
import { useAuth } from './context/AuthContext';

function App() {
	const { userIsLoading } = useAuth();
	const AppRoutes = lazy(() => import('./routes/Routes'));

	return (
		<BrowserRouter>
			{userIsLoading ? (
				<SuspendedScreen />
			) : (
				<Suspense fallback={<SuspendedScreen />}>
					<AppRoutes />
				</Suspense>
			)}
		</BrowserRouter>
	);
}

export default App;
