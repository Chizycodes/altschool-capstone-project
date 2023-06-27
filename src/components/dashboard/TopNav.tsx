import React, { useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../general/Button';

export const TopNav = ({ show, setShow }) => {
	const { dispatch, currentUser } = useAuth();
	console.log(currentUser, 'user-top');
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
				<img src="/images/logo.svg" alt="Logo.svg" className="xl:hidden block w-[8rem]" />
			</div>

			<div className="flex justify-between gap-3 items-center w-full pr-6">
				<div></div>
				<div className="w-full max-w-2xl h-full flex justify-end items-center pl-6 ">
					<div className="w-[90%] hidden sm:block">
						<div className="relative">
							<input type="search" placeholder="Search Chatter" className="c_input rounded-full pl-10" />
							<img src="/images/search-icon.svg" alt="search icon" className="absolute top-1/4 left-3" />
						</div>
					</div>
				</div>
				<div className="flex">
					<div className="w-full flex items-center pl-8 gap-2 justify-end">
						<div className="min-w-[32px] min-h-[32px] rounded-full bg-[#F5F6FA] flex items-center justify-center">
							<div className="relative cursor-pointer">
								<img src="/images/notif-icon.svg" alt="notification bell" />
								{/* <div className="w-[6px] h-[6px] rounded-full bg-primary absolute inset-0 mt-[3px] mr-[3px] m-auto" /> */}
							</div>
						</div>

						<div className="dropdown dropdown-hover dropdown-end">
							<label tabIndex={0} className="flex items-center py-2 px-3 gap-1">
								<div className="w-[32px] h-[32px] text-[#fff] bg-primary rounded-full flex items-center justify-center text-base">
									{currentUser ? (
										<>
											{currentUser?.photoURL ? (
												<img src={currentUser?.photoURL} alt="user" className="w-full h-full rounded-full" />
											) : (
												currentUser?.firstName?.charAt(0) + currentUser?.lastName?.charAt(0)
											)}
										</>
									) : (
										<img src="/images/avatar.svg" alt="" className="w-full h-full rounded-full" />
									)}
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
							</label>
							<ul tabIndex={0} className="dropdown-content menu bg-white p-4 shadow rounded-box w-60">
								{currentUser ? (
									<>
										<li className="border-b border-[#e6e4e4]">
											<div className="flex flex-row items-center gap-3">
												<div className="flex flex-col items-start">
													<h6 className="text-sm font-semibold">
														{currentUser?.firstName + ' ' + currentUser?.lastName}
													</h6>
													<p className="text-xs text-gray-600">{currentUser?.emailAddress}</p>
												</div>
											</div>
										</li>
										<li className="">
											<div className="flex items-center gap-2">
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
												<span className="text-sm">Account Settings</span>
											</div>
										</li>
										<li className="">
											<div className="flex items-center gap-2">
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
												<span className="text-sm text-red-600" onClick={() => dispatch({ type: 'LOGOUT' })}>
													Log out
												</span>
											</div>
										</li>
									</>
								) : (
									<>
										<div className="">
											<p className="text-lg font-semibold text-center mb-3">Sign up or Login to your Chatter account</p>
											<Link to="/login" className="">
												<Button text="Log in" styles="bg-white w-full my-5" />
											</Link>
											<Link to="/register" className="">
												<Button text="Sign up" styles="bg-primary text-white w-full" />
											</Link>
										</div>
									</>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
