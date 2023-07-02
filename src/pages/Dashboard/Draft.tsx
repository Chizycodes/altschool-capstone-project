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
	const { id } = useParams();
	const navigate = useNavigate();
	const [loadImage, setLoadImage] = useState(false);
	const [loadNewDraft, setLoadNewDraft] = useState(false);
	const [loading, setLoading] = useState(false);
	const [savingDraft, setSavingDraft] = useState(false);
	const [image, setImage] = useState<any>('');
	const [imageUrl, setImageUrl] = useState<any>('');
	const [postContent, setPostContent] = useState({
		title: '',
		body: '',
	});
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { currentUser } = useAuth();

	const [drafts, setDrafts] = useState([]);
	const [published, setPublished] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
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

	// Handle Image Upload
	const handleFileChange = (e: any) => {
		setLoadImage(true);
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		setImage(file);
	};

	const publishPost = () => {
		console.log('publish');
	};

	const saveDraft = async () => {
		setSavingDraft(true);
		try {
			const draft = await setDoc(doc(db, 'drafts', `${id}`), data);
			console.log(draft, 'draft');
			setSavingDraft(false);
		} catch (error) {
			const errorCode = error.code;
			setSavingDraft(false);
			toast.error(errorCode);
		}
	};

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
				}
			);
		};
		if (image) {
			uploadCoverImage(image);
		}
	}, [image]);

	// Get Draft
	useEffect(() => {
		const getDraft = async () => {
			const docRef = doc(db, 'drafts', `${id}`);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const { title, body, coverImage } = docSnap.data();
				setPostContent({ title, body });
				setImageUrl(coverImage);
			} else {
				console.log('No such document!');
			}
		};
		if (id) {
			getDraft();
		}
	}, [id]);

	// Create new draft
	useEffect(() => {
		const createNewDraft = async () => {
			setLoadNewDraft(true);
			try {
				const draft = await addDoc(collection(db, 'drafts'), data);
				console.log(draft.id, 'draft');
				navigate(`/dashboard/draft/${draft.id}`);
				setLoadNewDraft(false);
			} catch (error) {
				const errorCode = error.code;
				setLoadNewDraft(false);
				toast.error(errorCode);
			}
		};
		if (!id) {
			createNewDraft();
		}
	}, [id]);

	// Save draft every 5 seconds
	useEffect(() => {
		const saveDraftInterval = setTimeout(() => {
			if (postContent?.body.trim() !== '' || postContent?.title.trim() !== '') {
				// setSavingDraft(true);
				// saveDraft();
			}
		}, 5000);

		return () => {
			clearTimeout(saveDraftInterval);
		};
	}, [postContent]);

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
					navigate(`/draft/${list[0]?.id}`);
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
			await deleteDoc(doc(db, 'drafts', `${id}`));
			toast.success('Draft deleted');
		} catch (error) {
			toast.error(error.code);
		}
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
						{savingDraft && (
							<div className="absolute">
								<p className="text-green-500 flex items-center gap-2 ">
									Saving draft <SpinLoader />
								</p>
							</div>
						)}
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
							<div className="flex gap-3 justify-between">
								<div>
									<Button text="Preview" styles="bg-white" />
								</div>
								<div onClick={saveDraft}>
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
								onChange={(e) => setPostContent({ ...postContent, title: e.target.value })}
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
									onChange={(value) => setPostContent({ ...postContent, body: value })}
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
