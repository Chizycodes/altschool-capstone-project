import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DraftDrawer = ({ children, drafts, deleteDraft }) => {
	const location = useLocation();
	// const [showMore, setShowMore] = useState(false);
	return (
		<div className="drawer drawer-end">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Page content here */}
				{children}
			</div>
			<div className="drawer-side z-[1000]">
				<label htmlFor="my-drawer-4" className="drawer-overlay"></label>
				<div className="menu p-4 pt-10 w-80 h-full bg-white text-base-content">
					<h2 className="mb-3 font-semibold text-xl">My Drafts</h2>
					<ul>
						{drafts?.map((draft: any) => {
							return (
								<li
									key={draft?.id}
									className={`text-[#65717C] text-base cursor-pointer rounded-md flex flex-row items-center justify-between ${
										location.pathname == `/draft/${draft?.id}` ? 'bg-[#545a603a]' : ''
									}`}
								>
									<Link className="hover:text-[#5444F2]" to={`/draft/${draft?.id}`}>
										{draft?.title}
									</Link>

									<div className="dropdown dropdown-end">
										<label tabIndex={0} className="w-8 h-8 cursor-pointer">
											<img src="/images/more_icon.svg" alt="more" className="" />
										</label>
										<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32">
											<li>
												<span className="hover:text-[#5444F2]" onClick={() => deleteDraft(draft?.id)}>
													Delete
												</span>
											</li>
											<li>
												<span className="hover:text-[#5444F2]">Copy link</span>
											</li>
										</ul>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DraftDrawer;
