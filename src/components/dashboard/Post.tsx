import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { getDate, getReadTime, parseContent, getLinkTitle } from '../../utils/requests';

const Post = ({ post }) => {
	let body = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, totam quasi. Alias et, ratione distinctio perferendis odit vero veniam fuga qui error quidem autem, unde, nisi nostrum? Sed sapiente, nam nobis accusantium laboriosam sunt vero laborum facilis similique nulla perspiciatis beatae natus et. Temporibus quos sint praesentium omnis. Adipisci laudantium sapiente quisquam minus quae, in illum quam dolorem voluptate, suscipit qui tempore. Molestias ducimus voluptatem consectetur laborum. Facilis blanditiis quaerat vel aperiam voluptatem sit beatae accusamus voluptate, incidunt et itaque enim ut eos fuga? Ad ratione debitis, vel nihil architecto nemo tenetur perferendis consectetur sint, dolores quo animi a eveniet!"
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
					<div className="w-[80%] mr-3">
						<Link to={`/feed/${getLinkTitle(post?.title)}/${post?.id}`}>
							<h2 className="text-xl mt-3 font-bold cursor-pointer hover:text-primary">{post?.title}</h2>
						</Link>

						<p className="text-gray text-sm mt-2">{parseContent(post?.body)?.substring(0, 200) + '...'}</p>
					</div>

					<div className="w-[20%] h-[120px] mt-4 rounded-lg overflow-hidden">
						<img src={post?.coverImage} alt="post image" className="w-full h-full" />
					</div>
				</div>
				<div className="w-full flex gap-5 mt-3 justify-center">
					<div className="text-gray text-xs flex gap-2">
						<img src="/images/book-icon.svg" alt="book icon" />{' '}
						<span className="w-full">{getReadTime(post?.body)} min read</span>
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
