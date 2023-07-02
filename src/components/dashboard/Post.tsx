import dayjs from 'dayjs';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
	const getDate = (timestamp: any) => {
		const date = new Date(timestamp.seconds * 1000);
		const formattedDate = dayjs(date).format('D MMMM, YYYY');
		return formattedDate;
	};

	const getReadTime = (content: string) => {
		const wordsPerMinute = 200;
		const numberOfWords = content.split(/\s/g).length;
		const readTime = Math.ceil(numberOfWords / wordsPerMinute);
		return readTime;
	};

	const parseContent = (content: string) => {
		const parser = new DOMParser();
		const htmlDocument = parser.parseFromString(content, 'text/html');
		const textContent = htmlDocument.documentElement.textContent;
		return textContent;
	};
	return (
		<div className="card card-body border border-light_gray shadow-sm mb-5">
			<div>
				<div className="flex flex-row items-center gap-3">
					<div className="w-[50px] h-[50px] text-[#fff] bg-primary rounded-full flex items-center justify-center text-base overflow-hidden">
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
					<div className="flex flex-col gap-2 items-start">
						<h6 className="text-lg font-semibold">{post?.author?.firstName + ' ' + post?.author?.lastName}</h6>
						<p className="text-sm text-gray-600">{getDate(post?.timestamp)}</p>
					</div>
				</div>

				<Link to="/post">
					<h2 className="text-2xl mt-3 font-bold cursor-pointer">{post?.title}</h2>
				</Link>

				<span className="text-gray text-xs flex gap-2 mt-2">
					<img src="/images/book-icon.svg" alt="book icon" /> <p>{getReadTime(post?.body)} mins read</p>
				</span>

				<p className="text-gray text-sm mt-4">{parseContent(post?.body)}</p>

				<div className="w-full h-[242px] mt-4 rounded-lg overflow-hidden">
					<img src={post?.coverImage} alt="post image" className="w-full h-full" />
				</div>
				<div className="w-full flex gap-4 mt-3 justify-center">
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
