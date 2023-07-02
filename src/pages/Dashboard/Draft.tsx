import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/general/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { toast } from 'react-toastify';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	serverTimestamp,
	setDoc,
	query,
	where,
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import SpinLoader from '../../components/general/SpinLoader';
import DraftDrawer from '../../components/dashboard/DraftDrawer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'image'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['clean'],
	],
};
const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'code-block',
	'list',
	'bullet',
	'indent',
	'link',
];

const Draft = () => {
	const id = useParams()?.id;
	const location = useLocation();
	const navigate = useNavigate();
	const [loadImage, setLoadImage] = useState(false);
	const [loadNewDraft, setLoadNewDraft] = useState(false);
	const [loading, setLoading] = useState(false);
	const [savingDraft, setSavingDraft] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>('');
	const [postContent, setPostContent] = useState({
		title: '',
		body: '',
	});
	const [isSaved, setIsSaved] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { currentUser } = useAuth();
	const [drafts, setDrafts] = useState([]);
	const [published, setPublished] = useState([]);

	const data = {
		...postContent,
		coverImage: imageUrl,
		author: {
			...currentUser,
		},
		timestamp: serverTimestamp(),
	};

	// Handle publish post
	const publishPost = async () => {
		if (!postContent?.title) {
			toast.error('Please add a title to your post');
			return;
		} else if (!postContent?.body) {
			toast.error('Please add a body to your post');
			return;
		} else if (!imageUrl) {
			toast.error('Please add a cover image to your post');
			return;
		}
		setLoading(true);
		const post = {
			...data,
			likesCount: 0,
			commentsCount: 0,
			timestamp: serverTimestamp(),
		};
		try {
			if (location.pathname.includes(`/draft/${id}`)) {
				await addDoc(collection(db, 'posts'), post).then(async (docRef) => {
					await deleteDoc(doc(db, 'drafts', `${id}`));
					toast.success('Post published successfully');
					setLoading(false);
					console.log('Document written with ID: ', docRef);
					const title = postContent?.title?.toLowerCase().replace(/\s+/g, '-');
					navigate(`/feed/${title}/${docRef.id}`);
				});
			}
			if (location.pathname.includes(`/edit/${id}`)) {
				await setDoc(doc(db, 'posts', `${id}`), post).then(async () => {
					toast.success('Post updated successfully');
					setLoading(false);
					const title = postContent?.title?.toLowerCase().replace(/\s+/g, '-');
					navigate(`/feed/${title}/${id}`);
				});
			}
		} catch (error) {
			toast.error(error.code);
			setLoading(false);
		}
	};

	// Handle Image Upload
	const handleFileChange = (e: any) => {
		setLoadImage(true);
		const file = e.target.files[0];
		if (!file) {
			setLoadImage(false);
			return;
		}
		handleImageUpload(file);
	};
	const handleImageUpload = async (file: any) => {
		const name = new Date().getTime() + file?.name;
		const storageRef = ref(storage, name);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				switch (snapshot.state) {
					case 'paused':
						toast.info('Upload is paused');
						break;
					case 'running':
						setLoadImage(true);
						break;
					default:
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
				const errorCode = error.code;
				toast.error(errorCode);
				setLoadImage(false);
			},
			() => {
				// Handle successful uploads on complete
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					setImageUrl(downloadURL);
					setLoadImage(false);
				});
			}
		);
	};

	// Get Draft or Create New Draft
	const getContent = async (collection: any) => {
		setLoadNewDraft(true);
		try {
			const docRef = doc(db, collection, `${id}`);
			const docSnap: any = await getDoc(docRef);
			if (docSnap.exists()) {
				const { title, body, coverImage } = docSnap.data();
				setPostContent({ title, body });
				setImageUrl(coverImage);
			} else {
				createNewDraft();
			}
			setLoadNewDraft(false);
		} catch (error) {
			const errorCode = error.code;
			toast.error(errorCode);
			setLoadNewDraft(false);
		}
	};
	useEffect(() => {
		if (id) {
			if (location.pathname.includes(`/draft/${id}`)) {
				getContent('drafts');
			}
			if (location.pathname.includes(`/edit/${id}`)) {
				getContent('posts');
			}
		}
	}, [id, location.pathname]);
	const createNewDraft = async () => {
		setLoadNewDraft(true);
		try {
			const draft = await addDoc(collection(db, 'drafts'), data);
			navigate(`/draft/${draft.id}`);
			setLoadNewDraft(false);
		} catch (error) {
			const errorCode = error.code;
			setLoadNewDraft(false);
			toast.error(errorCode);
		}
	};

	// Get Draft and post List
	useEffect(() => {
		const draftQuery = query(collection(db, 'drafts'), where('author.id', '==', currentUser?.id));

		// Fetch drafts with matching author ID
		const draftUnsub = onSnapshot(
			draftQuery,
			(snapshot) => {
				const draftList: any = [];
				snapshot.docs.forEach((doc) => {
					draftList?.push({ id: doc.id, ...doc.data() });
				});
				setDrafts(draftList);

				if (draftList?.length > 0) {
					const { id } = draftList[0];
					navigate(`/draft/${id}`);
				} else {
					createNewDraft();
				}
			},
			(error) => {
				toast.error(error.code);
			}
		);

		// Fetch posts with matching author ID
		const postQuery = query(collection(db, 'posts'), where('author.id', '==', currentUser?.id));
		const postUnsub = onSnapshot(postQuery, (snapshot) => {
			const postList: any = [];
			snapshot.docs.forEach((doc) => {
				postList.push({ id: doc.id, ...doc.data() });
			});
			setPublished(postList);
		});
		return () => {
			draftUnsub();
			postUnsub();
		};
	}, []);

	// Delete Draft
	const deleteContent = async (collection: string, id: string) => {
		try {
			const confirmed = confirm('Are you sure you want to delete this item?');
			if (!confirmed) return;
			await deleteDoc(doc(db, collection, `${id}`));
			toast.success('Content deleted');
		} catch (error) {
			toast.error(error.code);
		}
	};

	// Delete Image
	const deleteImage = async () => {
		const desertRef = ref(storage, `${imageUrl}`);
		deleteObject(desertRef)
			.then(() => {
				setImageUrl('');
			})
			.catch((error) => {
				toast.error(error.code);
			});
	};

	// Save draft every 5 seconds
	const saveDraft = async () => {
		setSavingDraft(true);
		try {
			await setDoc(doc(db, 'drafts', `${id}`), data);
			setSavingDraft(false);
			setIsSaved(true);
			setTimeout(() => {
				setIsSaved(false);
			}, 2000);
		} catch (error) {
			const errorCode = error.code;
			setSavingDraft(false);
			toast.error(errorCode);
		}
	};

	const handleTitleChange = (e: any) => {
		console.log(e.target.value);
		setPostContent({ ...postContent, title: e.target.value });
	};

	const handleBodyChange = (value: string) => {
		setPostContent({ ...postContent, body: value });
	};

	useEffect(() => {
		let newTimerId: any;
		if (location.pathname.includes(`/draft`)) {
			newTimerId = setTimeout(() => {
				if (postContent?.body || postContent?.title || imageUrl) {
					saveDraft();
				}
			}, 7000);
		}
		return () => {
			clearTimeout(newTimerId);
		};
	}, [imageUrl, postContent?.body, postContent?.title]);

	return (
		<div className="w-full bg-white p-5 md:px-20 mx-auto min-h-screen">
			{loadNewDraft ? (
				<>
					<div className="flex justify-center items-center h-full">
						<SpinLoader />
					</div>
				</>
			) : (
				<DraftDrawer drafts={drafts} deleteContent={deleteContent} posts={published} createNewDraft={createNewDraft}>
					<div className="mb-20 relative">
						<div className="flex gap-3 justify-between w-full mb-5">
							<label htmlFor="my-drawer-4" className="drawer-button">
								<svg
									aria-label="Main Menu"
									aria-haspopup="true"
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-menu cursor-pointer"
									width={30}
									height={30}
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<line x1={4} y1={8} x2={20} y2={8} />
									<line x1={4} y1={16} x2={20} y2={16} />
								</svg>
							</label>
							{(savingDraft || isSaved) && (
								<div className="fixed bg-white top-[100px] right-6 shadow-md rounded-sm p-1 z-[1000]">
									{savingDraft && (
										<span className="text-green-500 flex items-center gap-2 ">
											Saving draft <SpinLoader />
										</span>
									)}
									{isSaved && (
										<span className="text-green-500 flex items-center gap-2 ">
											Saved <CheckOutlined className="text-green-500" />
										</span>
									)}
								</div>
							)}
							<div className="flex gap-3 justify-between">
								<div>
									<Button text="Preview" styles="bg-white" />
								</div>
								<div onClick={publishPost}>
									<Button text={location.pathname.includes('/draft') ? 'Publish' : 'Update'} isDisabled={loading} />
								</div>
							</div>
						</div>
						<div className="flex gap-3 mb-3 font">
							{!imageUrl && (
								<>
									<div onClick={() => inputRef.current?.click()}>
										<Button
											styles={`bg-none hover:bg-[#543ee093] font-normal text-base border-none ${
												loadImage ? 'cursor-not-allowed' : 'cursor-pointer'
											}}`}
											image="/images/image-icon.svg"
											text={loadImage ? 'Uploading...' : 'Add Cover'}
											isDisabled={loadImage}
										/>
									</div>
								</>
							)}
							<input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

							{/* <span>Add Subtitle</span> */}
						</div>
						<div>
							{imageUrl && (
								<div className="h-[20rem] w-full rounded-lg overflow-hidden mt-3 relative">
									<img src={imageUrl} alt="cover image" className="w-full h-full" />
									<div
										className="absolute bg-gray right-2 top-2 w-8 h-8 rounded-md flex items-center justify-center cursor-pointer"
										onClick={deleteImage}
									>
										<CloseOutlined />
									</div>
								</div>
							)}
							<textarea
								placeholder="Title..."
								className="w-full border-none rounded-lg mt-8 font-bold text-4xl outline-none focus:border-none hove:border-none scroll-m-0"
								value={postContent?.title}
								onChange={(e) => handleTitleChange(e)}
							/>

							<div className="">
								<ReactQuill
									placeholder="Write a post............."
									value={postContent?.body}
									modules={modules}
									formats={formats}
									onChange={handleBodyChange}
									className="h-40 text-base"
									theme="snow"
								/>
							</div>
						</div>
					</div>
				</DraftDrawer>
			)}
		</div>
	);
};

export default Draft;
