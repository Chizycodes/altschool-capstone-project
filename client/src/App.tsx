import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Landing/Home';
import Auth from './pages/AuthPages/Auth';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Auth />} />
				<Route path="/register" element={<Auth />} />
			</Routes>
		</>
	);
}

export default App;
