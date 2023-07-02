import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { getDate, getReadTime, parseContent } from '../../utils/requests';

const Post = ({ post }) => {
	return (
		<div className="card card-body border border-light_gray shadow-sm mb-5">
			<div>
				<div className="flex flex-row items-center gap-3">
					<div className="w-[30px] h-[30px] text-[#fff] bg-primary rounded-full flex items-center justify-center text-sm overflow-hidden">
						{
							<>
								{post?.author?.photoURL ? (
									<img src={post?.author?.photoURL} alt="user" className="w-full h-full rounded-full" />
								) : (
									post?.author?.firstName?.charAt(0) + post?.author?.lastName?.charAt(0)
								)}
							</>
						}
						{/* <img src="/images/person.svg" className="w-full h-full" alt="user" /> */}
					</div>
					<div className="flex flex-col">
						<span className="text-base font-semibold">{post?.author?.firstName + ' ' + post?.author?.lastName}</span>

						<span className="text-xs text-gray-600">{getDate(post?.timestamp)}</span>
					</div>
				</div>

				<div className="flex">
					<div className="w-[80%]">
						<Link to={`feed/${post?.title}/${post?.id}`}>
							<h2 className="text-xl mt-3 font-bold cursor-pointer hover:text-primary">{post?.title}</h2>
						</Link>

						<p className="text-gray text-sm mt-2">{parseContent(post?.body)}</p>
					</div>

					<div className="w-[20%] h-[120px] mt-4 rounded-lg overflow-hidden">
						<img src={post?.coverImage} alt="post image" className="w-full h-full" />
					</div>
				</div>
				<div className="w-full flex gap-5 mt-3 justify-center">
					<div className="text-gray text-xs flex gap-2">
						<img src="/images/book-icon.svg" alt="book icon" />{' '}
						<span className="w-full">{getReadTime(post?.body)} mins read</span>
					</div>
					<div className="flex gap-2 items-center">
						<img className="cursor-pointer" src="/images/comment-icon.svg" alt="comment" />
						<span className="text-gray text-xs">{post?.commentsCount}</span>
					</div>
					<div className="flex gap-2 items-center">
						<img className="cursor-pointer" src="/images/like-icon.svg" alt="comment" />
						<span className="text-gray text-xs">{post?.likesCount}</span>
					</div>
					{/* <div className="flex gap-2 items-center">
						<img className="cursor-pointer" src="/images/analytics-icon.svg" alt="comment" />
						<span className="text-gray text-xs">2980 views</span>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Post;
