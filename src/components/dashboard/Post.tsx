import React from 'react';
import { Link } from 'react-router-dom';

const Post = () => {
	return (
		<div className="card card-body border border-light_gray shadow-sm">
			<div>
				<div className="flex flex-row items-center gap-3">
					<div className="w-[70px] h-[70px] text-[#fff] bg-primary rounded-full flex items-center justify-center text-base overflow-hidden">
						<img src="/images/person.svg" className="w-full h-full" alt="user" />
					</div>
					<div className="flex flex-col gap-2 items-start">
						<h6 className="text-lg font-semibold">Grace Ikang</h6>
						<p className="text-sm text-gray-600">Product designer, May 25th, 2023</p>
					</div>
				</div>

				<Link to="/post">
					<h2 className="text-2xl mt-3 font-bold cursor-pointer">Starting out as a Product designer</h2>
				</Link>

				<span className="text-gray text-xs flex gap-2 mt-2">
					<img src="/images/book-icon.svg" alt="book icon" /> <p>10 mins read</p>
				</span>

				<p className="text-gray text-sm mt-4">
					Embarking on a journey as a product designer can be an exhilarating and fulfilling experience. As a profession
					that bridges the realms of art, technology, and problem-solving, product design offers an opportunity to shape
					the way people interact with the world around them...
				</p>

				<div className="w-full h-[242px] mt-4 rounded-lg overflow-hidden">
					<img src="/images/post-image.svg" alt="post image" className="w-full h-full" />
				</div>
				<div className="w-full flex justify-between gap-3">
					<div className="flex gap-2 items-center">
						<img className="cursor-pointer" src="/images/comment-icon.svg" alt="comment" />
						<span className="text-gray text-xs">200</span>
					</div>
					<div className="flex gap-2 items-center">
						<img className="cursor-pointer" src="/images/like-icon.svg" alt="comment" />
						<span className="text-gray text-xs">120</span>
					</div>
					<div className="flex gap-2 items-center">
						<img className="cursor-pointer" src="/images/analytics-icon.svg" alt="comment" />
						<span className="text-gray text-xs">2980 views</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;