import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/general/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { toast } from 'react-toastify';
import {
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import SpinLoader from '../../components/general/SpinLoader';
import DraftDrawer from '../../components/dashboard/DraftDrawer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';

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
	console.log(id, 'id');
	const navigate = useNavigate();
	const [loadImage, setLoadImage] = useState(false);
	const [loadNewDraft, setLoadNewDraft] = useState(false);
	const [loading, setLoading] = useState(false);
	const [savingDraft, setSavingDraft] = useState(false);
	const [image, setImage] = useState<any>('');
	const [imageUrl, setImageUrl] = useState<any>('');
	// const [draftId, setDraftId] = useState<any>(id);
	const [timerId, setTimerId] = useState<any>(null);
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
			id: currentUser?.id,
			firstName: currentUser?.firstName,
			lastName: currentUser?.lastName,
		},
		dateCreated: serverTimestamp(),
	};

	// Handle publish post
	const publishPost = async () => {
		setLoading(true);
		try {
			const post = await addDoc(collection(db, 'posts'), data);
			console.log(post.id, 'draft');
			await deleteDoc(doc(db, 'drafts', `${id}`));
			toast.success('Post published successfully');
			setLoading(false);
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
			return;
		}
		setImage(file);
	};

	// Image Upload to Firebase Storage
	useEffect(() => {
		const uploadCoverImage = async (file: any) => {
			const name = new Date().getTime() + image?.name;
			const storageRef = ref(storage, name);
			console.log(storageRef, 'storageRef');
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
					setLoadImage(false);
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL);
						setImageUrl(downloadURL);
					});
					saveDraft();
				}
			);
		};
		if (image) {
			uploadCoverImage(image);
		}
	}, [image]);

	// Get Draft or Create New Draft

	const getDraft = async (id: string) => {
		const docRef = doc(db, 'drafts', `${id}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const { title, body, coverImage } = docSnap.data();
			setPostContent({ title, body });
			setImageUrl(coverImage);
		} else {
			console.log('No such document!');
			navigate('/draft');
		}
	};

	const createNewDraft = async () => {
		setLoadNewDraft(true);
		try {
			const draft = await addDoc(collection(db, 'drafts'), data);
			console.log(draft.id, 'draft');
			navigate(`/draft/${draft.id}`);
			setLoadNewDraft(false);
		} catch (error) {
			const errorCode = error.code;
			setLoadNewDraft(false);
			toast.error(errorCode);
		}
	};

	// Get Draft List
	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, 'drafts'),
			(snapshot) => {
				const list: any = [];
				snapshot.docs.forEach((doc) => {
					list.push({ id: doc.id, ...doc.data() });
				});
				setDrafts(list);

				// Set first draft id in url
				if (list?.length > 0) {
					const { title, body, coverImage, id } = list[0];
					navigate(`/draft/${id}`);
					setPostContent({ title, body });
					setImageUrl(coverImage);
				} else {
					navigate('/draft');
					createNewDraft();
				}
			},
			(error) => {
				toast.error(error.code);
			}
		);
		return () => {
			unsub();
		};
	}, []);

	// Delete Draft
	const deleteDraft = async (id: string) => {
		try {
			const confirmed = confirm('Are you sure you want to delete this draft?');
			if (!confirmed) return;
			await deleteDoc(doc(db, 'drafts', `${id}`));
			toast.success('Draft deleted');
		} catch (error) {
			toast.error(error.code);
		}
	};

	// Save draft every 5 seconds
	const saveDraft = async () => {
		setSavingDraft(true);
		try {
			const draft = await setDoc(doc(db, 'drafts', `${id}`), data);
			console.log(draft, 'draft');
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
	useEffect(() => {
		return () => {
			clearTimeout(timerId);
		};
	}, [timerId]);

	const handleTitleChange = (e: any) => {
		setPostContent({ ...postContent, title: e.target.value });

		clearTimeout(timerId);

		// Set a new timer to save the input text after 10 seconds

		const newTimerId = setTimeout(() => {
			if (postContent?.title.trim() !== '') {
				saveDraft();
			}
		}, 7000);
		setTimerId(newTimerId);
	};

	const handleBodyChange = (value: string) => {
		setPostContent({ ...postContent, body: value });

		clearTimeout(timerId);

		// Set a new timer to save the input text after 10 seconds

		const newTimerId = setTimeout(() => {
			if (postContent?.body.trim() !== '') {
				saveDraft();
			}
		}, 7000);
		setTimerId(newTimerId);
	};

	return (
		<div className="w-full bg-white p-5 md:px-20 mx-auto min-h-screen">
			{loadNewDraft ? (
				<>
					<div className="flex justify-center items-center h-full">
						<SpinLoader />
					</div>
				</>
			) : (
				<DraftDrawer drafts={drafts} deleteDraft={deleteDraft}>
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
								<div className="fixed bg-white top-[100px] right-6 shadow-md rounded-md p-1">
									{!savingDraft && (
										<p className="text-green-500 flex items-center gap-2 ">
											Saving draft <SpinLoader />
										</p>
									)}
									{isSaved && (
										<p className="text-green-500 flex items-center gap-2 ">
											Saved <CheckOutlined className="text-green-500" />
										</p>
									)}
								</div>
							)}
							<div className="flex gap-3 justify-between">
								<div>
									<Button text="Preview" styles="bg-white" />
								</div>
								<div onClick={publishPost}>
									<Button text="Publish" isDisabled={loading} />
								</div>
							</div>
						</div>
						<div className="flex gap-3 mb-3 font">
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

							<input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
							{/* <span>Add Subtitle</span> */}
						</div>
						<div>
							<textarea
								placeholder="Title..."
								className="w-full border-none rounded-lg mt-3 font-bold text-4xl outline-none focus:border-none hove:border-none scroll-m-0"
								value={postContent?.title}
								onChange={handleTitleChange}
							/>
							{imageUrl && (
								<div className="h-[20rem] w-full rounded-lg overflow-hidden mb-10">
									<img src={imageUrl} alt="cover image" className="w-full h-full" />
								</div>
							)}
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
