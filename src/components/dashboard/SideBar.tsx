import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../utils/nav';

export const SideBar = ({ show, setShow }) => {
	const location = useLocation();
	return (
		<>
			<div className="absolute xl:relative w-64 h-screen overflow-y-auto shadow bg-[#FFFFFF] hidden xl:block">
				<div className="h-16 w-full flex items-center px-8">
					<img src="/images/logo.svg" alt="" />
				</div>
				<div className="flex flex-col h-[calc(100vh-64px)]">
					<ul className="py-3">
						{navItems.overview.map((item, i) => {
							return (
								<li
									key={i}
									className={`pl-6 cursor-pointer leading-4  focus:outline-none ${
										item.header
											? 'text-black font-bold mb-[22px] mt-[33px] uppercase cursor-default text-sm'
											: 'mb-5 text-[#65717C] hover:text-[#5444F2] text-base'
									}`}
								>
									<div className="flex items-center gap-4">
										{!item.header && (
											<div>
												<img
													src={item.link && location.pathname.startsWith(item.link) ? item.iconActive : item.icon}
													alt={item.title}
												/>
											</div>
										)}
										<div>
											{item?.header ? (
												<p className="">{item.title}</p>
											) : (
												<Link
													to={item.link}
													className={item.link && location.pathname.startsWith(item.link) ? 'text-primary' : ''}
												>
													{item.title}
												</Link>
											)}
										</div>
									</div>
								</li>
							);
						})}
					</ul>

					<ul className="py-3">
						{navItems.trends.map((item, i) => {
							return (
								<li
									key={i}
									className={`pl-6 cursor-pointer leading-4  focus:outline-none ${
										item.header
											? 'text-black font-bold mb-[22px] uppercase cursor-default text-sm'
											: 'mb-5 text-[#65717C] hover:text-[#5444F2] text-base'
									}`}
								>
									<div className="flex items-center gap-4">
										{item?.header ? (
											<p className="">{item.title}</p>
										) : (
											<Link to={item.link} className="">
												{item.title}
											</Link>
										)}
										{item.header && (
											<div>
												<img src={item.icon} alt={item.title} />
											</div>
										)}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			<div
				className={
					show
						? 'w-full h-screen absolute z-40  transform  translate-x-0 '
						: '   w-full h-screen absolute z-40  transform -translate-x-full'
				}
				id="mobile-nav"
			>
				<div className="bg-[#000000] opacity-50 absolute h-screen w-full xl:hidden" onClick={() => setShow(!show)} />
				<div className="absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-[#FFFFFF] xl:hidden transition duration-150 ease-in-out h-screen overflow-y-auto">
					<div className="flex flex-col justify-between h-full w-full">
						<div>
							<div className="flex items-center justify-between px-8">
								<div className="h-16 w-full flex items-center">
									<img src="/images/logo.svg" alt="Logo" />
								</div>
								<div
									id="closeSideBar"
									className="flex items-center justify-center h-10 w-10"
									onClick={() => setShow(!show)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-x"
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
										<line x1={18} y1={6} x2={6} y2={18} />
										<line x1={6} y1={6} x2={18} y2={18} />
									</svg>
								</div>
							</div>

							<div className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto ">
								<ul className="py-3">
									{navItems.overview.map((item, i) => {
										return (
											<li
												key={i}
												className={`pl-6 cursor-pointer leading-4  focus:outline-none ${
													item.header
														? 'text-[#000000] font-bold mb-[22px] mt-[33px] uppercase cursor-default text-sm'
														: 'mb-5 text-[#65717C] hover:text-[#5444F2] text-base'
												}`}
											>
												<div className="flex items-center gap-4">
													{!item.header && (
														<div>
															<img src={item.icon} alt={item.title} />
														</div>
													)}

													<Link to={item.link} className="">
														{item.title}
													</Link>
												</div>
											</li>
										);
									})}
								</ul>

								<ul className="py-3">
									{navItems.trends.map((item, i) => {
										return (
											<li
												key={i}
												className={`pl-6 cursor-pointer leading-4  focus:outline-none ${
													item.header
														? 'text-black font-bold mb-[22px] uppercase cursor-default text-sm'
														: 'mb-5 text-[#65717C] hover:text-[#5444F2] text-base'
												}`}
											>
												<div className="flex items-center gap-4">
													{item?.header ? (
														<p className="">{item.title}</p>
													) : (
														<Link to={item.link} className="">
															{item.title}
														</Link>
													)}
													{item.header && (
														<div>
															<img src={item.icon} alt={item.title} />
														</div>
													)}
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
