import React, { useState } from 'react';
import { SideBar } from './SideBar';
import { TopNav } from './TopNav';
import { Outlet } from 'react-router-dom';

const Dashboardlayout = () => {
	const [show, setShow] = useState(false);
	const [profile, setProfile] = useState(false);

	return (
		<>
			<div className="w-full max-h-screen bg-[#F5F6FA]">
				<div className="flex flex-no-wrap h-full">
					<SideBar show={show} setShow={setShow} />
					<div className="w-full h-screen overflow-y-auto">
						<TopNav show={show} setShow={setShow} profile={profile} setProfile={setProfile} />
						<div className="mx-auto py-[36px] px-3 lg:px-6 ">
							<div className="w-full ">
                <Outlet />
              </div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboardlayout;