import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboardlayout from '../components/dashboard/DashboardLayout';
import Draft from '../pages/Dashboard/Draft';
import { useAuth } from '../context/AuthContext';
import Error404 from '../pages/Error/Error404';

const PrivateRoutes = () => {
	const { currentUser } = useAuth();
	if (!currentUser) {
		return <Navigate to="/login" />;
	}
	return (
		<Routes>
			<Route path="login" element={<Navigate to="/feed" />} />
			<Route element={<Dashboardlayout />}>
				<Route path="draft" element={<Draft />} />
				<Route path="draft/:id" element={<Draft />} />
				<Route path="edit" element={<Draft />} />
				<Route path="edit/:id" element={<Draft />} />
			</Route>
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default PrivateRoutes;
