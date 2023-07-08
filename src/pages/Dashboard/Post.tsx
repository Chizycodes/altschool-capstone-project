import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { getDate, getReadTime } from '../../utils/requests';
import { SanitizeHtml } from '../../utils/requests';
import SpinLoader from '../../components/general/SpinLoader';

const Post = () => {
	const { id } = useParams<{ id: any }>();
	const [post, setPost] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	const getPostById = async (id: string) => {
		setLoading(true);
		const docRef = doc(db, 'posts', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			console.log(data);
			setPost({ id: docSnap.id, ...data });
			setLoading(false);
		} else {
			console.log('No such document!');
			setLoading(false);
		}
	};

	useEffect(() => {
		getPostById(id);
	}, []);
	return (
		<div className="max-w-5xl mx-auto bg-white min-h-screen">
			{loading ? (
				<div className="w-full flex justify-center pt-10">
					<SpinLoader />
				</div>
			) : (
				<div>
					<div>
						<img src={post?.coverImage} alt={post?.title} className="w-full h-[300px] md:h-[550px]" />
					</div>
					<div className="mt-6 max-w-4xl mx-auto">
						<div className="text-center">
							<h1 className="font-bold text-4xl">{post?.title}</h1>
							<div className="flex items-center justify-center gap-3 w-full mt-5">
								<div className="w-[40px] h-[40px] text-[#fff] bg-primary rounded-full flex items-center justify-center text-sm overflow-hidden">
									{
										<>
											{post?.author?.photoURL ? (
												<img
													src={post?.author?.photoURL}
													alt={post?.author?.firstName}
													className="w-full h-full rounded-full"
												/>
											) : (
												post?.author?.firstName?.charAt(0) + post?.author?.lastName?.charAt(0)
											)}
										</>
									}
								</div>
								<span className="text-lg font-semibold">{post?.author?.firstName + ' ' + post?.author?.lastName}</span>

								<span className="text-base text-gray-600">{getDate(post?.timestamp)}</span>

								<div className="text-gray text-xs flex gap-2">
									<img src="/images/book-icon.svg" alt="book icon" />
									<span className="w-full">{getReadTime(post?.body)} min read</span>
								</div>
							</div>
						</div>
						<div className="mt-7">
							<div dangerouslySetInnerHTML={SanitizeHtml(post?.body)}></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Post;
