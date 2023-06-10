import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../pages/AuthPages/Auth';
import Home from '../pages/Landing/Home';
import Error404 from '../pages/Error/Error404';
import PrivateRoutes from './PrivateRoutes';

const PublicRoutes = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="login" element={<Auth />} />
			<Route path="register" element={<Auth />} />
			<Route path="*" element={<Error404 />} />
			<Route path="/dashboard/*" element={<PrivateRoutes />} />
		</Routes>
	);
};

export default PublicRoutes;
