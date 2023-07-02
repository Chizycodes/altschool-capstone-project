import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Post from '../../components/dashboard/Post';
import Button from '../../components/general/Button';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

type Props = '';

const Feed = () => {
	const { pathname } = useLocation();
	const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const postQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
		const postUnsub = onSnapshot(postQuery, (snapshot) => {
			const postList: any = [];
			snapshot.docs.forEach((doc) => {
				postList.push({ id: doc.id, ...doc.data() });
			});
			setPosts(postList);
		});
		return () => {
			postUnsub();
		};
	}, []);

	return (
		<div className="max-w-3xl bg-white p-5 md:p-10 mx-auto">
			<div className="flex flex-row justify-between gap-3">
				<div className="">
					<h1 className="text-2xl font-bold">FEED</h1>
					<p className="text-gray">Explore different content you’d love </p>
				</div>
				<Link to="/draft" className="">
					<Button text="Post a Content" image="/images/pen-icon.svg" />
				</Link>
			</div>

			<div className="mt-5 w-full">
				<div className="tabs font-bold w-full border border-[#D0D0D0] rounded-lg">
					<div className="w-1/3 text-center h-full">
						<Link
							to="/for-you"
							className={`tab tab-bordered text-center py-2 px-0  justify-start h-full  ${
								pathname.includes('/') ? 'border-[#543EE0] border-b-[4px]' : 'border-none'
							}`}
						>
							For you
						</Link>
					</div>
					<div className="w-1/3 text-center h-full">
						<Link
							to="/featured"
							className={`tab tab-bordered text-center py-2 px-0 justify-end border-b-[6px] h-full  ${
								pathname.includes('featured') ? 'border-[#543EE0] border-b-[4px]' : 'border-none'
							}`}
						>
							Featured
						</Link>
					</div>
					<div className="w-1/3 text-center h-full">
						<Link
							to="/recent"
							className={`tab tab-bordered text-center py-2 px-0 justify-end border-b-[6px] h-full  ${
								pathname.includes('recent') ? 'border-[#543EE0] border-b-[4px]' : 'border-none'
							}`}
						>
							Recent
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-8">
				{
					posts?.map((post: any) => {
						return <Post key={post.id} post={post} />;
					})
				}
			</div>
		</div>
	);
};

export default Feed;
