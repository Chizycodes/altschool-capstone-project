import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/general/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { toast } from 'react-toastify';
import { DocumentData, DocumentReference, addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import SpinLoader from '../../components/general/SpinLoader';
import DraftDrawer from '../../components/dashboard/DraftDrawer';
import { useParams } from 'react-router-dom';

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
	const [loadImage, setLoadImage] = useState(false);
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

	// Handle Image Upload
	const handleFileChange = (e: any) => {
		setLoadImage(true);
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		setImage(file);
		// const reader = new FileReader();

		// reader.onloadend = () => {
		// 	setImageUrl(reader.result);
		// };

		// reader.readAsDataURL(file);
	};

	const publishPost = () => {
		console.log('publish');
	};

	const saveDraft = async () => {
		setSavingDraft(true);
		try {
			const draft = await addDoc(collection(db, 'drafts'), {
				...postContent,
				coverImage: imageUrl,
				author: {
					id: currentUser?.id,
					firstName: currentUser?.firstName,
					lastName: currentUser?.lastName,
				},
				dateCreated: serverTimestamp(),
			});
			console.log(draft.id, 'draft');
			setSavingDraft(false);
		} catch (error) {
			console.log(error, 'error');
			const errorCode = error.code;
			const errorMessage = error.message;
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
					// const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log('Upload is ' + progress + '% done');
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
					const errorMessage = error.message;
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
				console.log('Document data:', docSnap.data());
				// setPostContent(docSnap.data());
				// setImageUrl(docSnap.data().coverImage);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		};
		if (id) {
			getDraft();
		}
	}, [id]);

	useEffect(() => {
		const saveDraftInterval = setTimeout(() => {
			if (postContent?.body.trim() !== '' || postContent?.title.trim() !== '') {
				// setSavingDraft(true);
				// saveDraft();
				console.log('saving draft');
			}
		}, 5000);

		return () => {
			clearTimeout(saveDraftInterval);
		};
	}, [postContent]);
	return (
		<div className="w-full bg-white p-5 md:px-20 mx-auto min-h-screen">
			<DraftDrawer>
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
		</div>
	);
};

export default Draft;
