import React, { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Auth from '../pages/AuthPages/Auth';
import Home from '../pages/Landing/Home';
import Error404 from '../pages/Error/Error404';
import Dashboardlayout from '../components/dashboard/DashboardLayout';
import Feed from '../pages/Dashboard/Feed';
import Draft from '../pages/Dashboard/Draft';
import { useAuth } from '../context/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import Post from '../pages/Dashboard/Post';

const AppRoutes = () => {
	const { currentUser } = useAuth();
	console.log(currentUser)
	return (
		<Routes>
			<Route path="/*">
				<Route index element={<Home />} />
				<Route element={<Dashboardlayout />}>
					<Route path="feed" element={<Feed />} />
					<Route path="feed/:title/:id" element={<Post />} />
				</Route>
				<Route path="login" element={currentUser ? <Navigate to="/feed" /> : <Auth />} />
				<Route path="*" element={<PrivateRoutes />} />
				<Route path="register" element={<Auth />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
