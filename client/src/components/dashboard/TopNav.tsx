import React from 'react';
// import { UserAuth } from '../context/AuthContext';

export const TopNav = ({ profile, setProfile, show, setShow }) => {
	// const { logOut, user } = UserAuth();
	const logOut = () => {
		console.log('logout');
	};
	const user = {
		displayName: 'John Doe',
		email: '',
	};
	return (
		<nav className="h-[78px] flex items-center justify-between bg-[#ffffff] shadow relative z-10 pl-6">
			<div className="flex items-center gap-2">
				<div className="text-gray-600 visible xl:hidden relative" onClick={() => setShow(!show)}>
					{show ? (
						' '
					) : (
						<svg
							aria-label="Main Menu"
							aria-haspopup="true"
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-menu cursor-pointer"
							width={30}
							height={30}
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<line x1={4} y1={8} x2={20} y2={8} />
							<line x1={4} y1={16} x2={20} y2={16} />
						</svg>
					)}
				</div>
				<img src="/images/logo.svg" alt="Logo.svg" className="xl:hidden block" />
			</div>

			<div className="flex w-full pr-6">
				<div className="w-1/2 h-full flex items-center pl-6 pr-24"></div>
				<div className="w-1/2 flex">
					<div className="w-full flex items-center pl-8 gap-3 justify-end">
						<div className="min-w-[32px] min-h-[32px] rounded-full bg-[#F5F6FA] flex items-center justify-center">
							<div className="relative cursor-pointer">
								<img src="/images/notif-icon.svg" alt="notification bell" />
								{/* <div className="w-[6px] h-[6px] rounded-full bg-primary absolute inset-0 mt-[3px] mr-[3px] m-auto" /> */}
							</div>
						</div>

						<div className="flex items-center relative cursor-pointer" onClick={() => setProfile(!profile)}>
							<div className="rounded-full">
								{profile ? (
									<ul className="p-2 w-full bg-[#ffffff] absolute rounded left-0 shadow mt-12 sm:mt-16 ">
										<li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
											<div className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-user"
													width={18}
													height={18}
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" />
													<circle cx={12} cy={7} r={4} />
													<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
												</svg>
												<span className="text-sm ml-2">My Profile</span>
											</div>
										</li>
										<li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
											<div className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-logout"
													width={20}
													height={20}
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" />
													<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
													<path d="M7 12h14l-3 -3m0 6l3 -3" />
												</svg>
												<span className="text-sm ml-2" onClick={() => logOut()}>
													Sign out
												</span>
											</div>
										</li>
									</ul>
								) : (
									''
								)}
							</div>

							<div className="flex items-center bg-[#f5f6fa] py-2 px-3 gap-2 rounded-xl">
								<div className="w-[32px] h-[32px] text-[#fff] bg-primary rounded-full flex items-center justify-center text-base">
									JT
								</div>
								<div className="hidden md:block">
									<p className="text-base text-[#000000] font-bold">{user?.displayName}</p>
									<p className="text-[#65717c] text-sm">{user?.email}</p>
								</div>

								<div className="cursor-pointer text-gray-600">
									<svg
										aria-haspopup="true"
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-chevron-down"
										width={20}
										height={20}
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<polyline points="6 9 12 15 18 9" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
