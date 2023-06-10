import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';

function App() {
	return (
		<>
			<Routes>
				<Route path="/*" element={<PublicRoutes />} />
			</Routes>
		</>
	);
}

export default App;
