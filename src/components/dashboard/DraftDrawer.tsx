import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { Link, useParams, useLocation } from 'react-router-dom';

const DraftDrawer = ({ children }) => {
	const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams<{ id: string }>();
	const location = useLocation();

	console.log(drafts, 'drafts');
	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, 'drafts'),
			(snapshot) => {
				const list: any = [];
				snapshot.docs.forEach((doc) => {
					list.push({ id: doc.id, ...doc.data() });
				});
				setDrafts(list);
			},
			(error) => {
				toast.error(error.code);
			}
		);
		return () => {
			unsub();
		};
	}, []);
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
						{drafts.map((draft: any) => {
							return (
								<li
									key={draft?.id}
									className={`text-[#65717C] hover:text-[#5444F2] text-base cursor-pointer rounded-md ${
										location.pathname == `/draft/${draft?.id}` ? 'bg-[#545a603a]' : ''
									}`}
								>
									<Link to={`/draft/${draft?.id}`}>{draft?.title}</Link>
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
