import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../pages/Dashboard/Feed';
import Dashboardlayout from '../components/dashboard/DashboardLayout';
import Draft from '../pages/Dashboard/Draft';

const PrivateRoutes = () => {
	return (
		<Routes>
			<Route element={<Dashboardlayout />}>
				<Route path='feed' element={<Feed />} />
				<Route path='draft' element={<Draft />} />
			</Route>
		</Routes>
	);
};

export default PrivateRoutes;
