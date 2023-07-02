import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../general/Button';

const DraftDrawer = ({ children, drafts, deleteContent, posts, createNewDraft }) => {
	const location = useLocation();
	const navigate = useNavigate();
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
				<div className="menu p-4 pt-10 w-80 h-full bg-white text-base-content overflow-auto block">
					<div>
						<h2 className="mb-3 font-semibold text-lg">My Drafts</h2>
						<ul>
							{drafts?.map((draft: any) => {
								return (
									<li
										key={draft?.id}
										className={`text-[#65717C] text-base rounded-md flex flex-row items-center justify-between ${
											location.pathname == `/draft/${draft?.id}` ? 'bg-[#545a603a]' : ''
										}`}
									>
										<label
											htmlFor="my-drawer-4"
											onClick={() => navigate(`/draft/${draft?.id}`)}
											className="hover:text-[#5444F2] cursor-pointer"
										>
											{draft?.title == '' ? 'Untitled' : draft?.title}
										</label>

										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="w-8 h-8 cursor-pointer">
												<img src="/images/more_icon.svg" alt="more" className="" />
											</label>
											<ul
												tabIndex={0}
												className="dropdown-content z-[1] menu py-2 shadow bg-white rounded-box text-sm top-10"
											>
												<li>
													<span
														className="hover:text-[#5444F2] px-2"
														onClick={() => deleteContent('drafts', draft?.id)}
													>
														Delete
													</span>
												</li>
												<li>
													<span className="hover:text-[#5444F2] px-2">Copy link</span>
												</li>
											</ul>
										</div>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="mt-7">
						<h2 className="mb-3 font-semibold text-lg">Published Posts</h2>
						<ul>
							{posts?.map((post: any) => {
								return (
									<li
										key={post?.id}
										className={`text-[#65717C] text-base rounded-md flex flex-row items-center justify-between ${
											location.pathname == `/edit/${post?.id}` ? 'bg-[#545a603a]' : ''
										}`}
									>
										<label
											htmlFor="my-drawer-4"
											onClick={() => navigate(`/edit/${post?.id}`)}
											className="hover:text-[#5444F2] cursor-pointer"
										>
											{post?.title == '' ? 'Untitled' : post?.title}
										</label>

										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="w-8 h-8 cursor-pointer">
												<img src="/images/more_icon.svg" alt="more" className="" />
											</label>
											<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box top-10">
												<li>
													<span className="hover:text-[#5444F2] px-2" onClick={() => deleteContent('posts', post?.id)}>
														Delete
													</span>
												</li>
												<li>
													<span className="hover:text-[#5444F2] px-2">Copy link</span>
												</li>
											</ul>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="sticky w-full bottom-[-20px] left-0 mt-16 bg-white pb-5">
						<div onClick={createNewDraft}>
							<Button text="New Draft" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DraftDrawer;
