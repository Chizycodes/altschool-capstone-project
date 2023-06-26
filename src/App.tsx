import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<PublicRoutes />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
