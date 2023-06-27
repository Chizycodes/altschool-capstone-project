import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../pages/AuthPages/Auth';
import Home from '../pages/Landing/Home';
import Error404 from '../pages/Error/Error404';
import Dashboardlayout from '../components/dashboard/DashboardLayout';
import Feed from '../pages/Dashboard/Feed';
import Draft from '../pages/Dashboard/Draft';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
	const { currentUser } = useAuth();
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route element={<Dashboardlayout />}>
				<Route path="feed" element={<Feed />} />
			</Route>

			{currentUser ? (
				<>
					<Route path="login" element={<Navigate to="/feed" />} />
					<Route element={<Dashboardlayout />}>
						<Route path="draft" element={<Draft />} />
					</Route>
				</>
			) : (
				<>
					<Route path="draft" element={<Navigate to="/login" />} />
					<Route path="login" element={<Auth />} />
				</>
			)}
			<Route path="register" element={<Auth />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default AppRoutes;
