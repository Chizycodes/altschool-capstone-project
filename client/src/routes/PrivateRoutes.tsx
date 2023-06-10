import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../pages/Dashboard/Feed';
import Dashboardlayout from '../components/dashboard/DashboardLayout';

const PrivateRoutes = () => {
	return (
		<Routes>
			<Route element={<Dashboardlayout />}>
				<Route path="feed" element={<Feed />} />
			</Route>
		</Routes>
	);
};

export default PrivateRoutes;
