import React from 'react';
import Button from '../../components/general/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', "image"],
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
	const [image, setImage] = React.useState<any>('');
	const [value, setValue] = React.useState({
		title: '',
		post: '',
	});
	const uploadCover = async () => {
		const name = new Date().getTime() + '-' + image.name;
		const storageRef = ref(storage, name)
	}
	const handleChange = (value: any) => {
		console.log(value);
		setValue({ ...value, post: value });
	};
	return (
		<div className="w-full bg-white p-5 md:px-20 mx-auto min-h-screen">
			<div className="flex gap-3 justify-end w-full mb-5">
				<Button text="Preview" styles="bg-white" />
				<Button text="Publish" />
			</div>
			<div className="flex gap-3 mb-3">
				<span className="flex gap-2 hover:bg-[#543ee093] py-1 px-2 rounded-md cursor-pointer">
					<img src="/images/image-icon.svg" alt="image-icon" /> Add Cover
				</span>
				{/* <span>Add Subtitle</span> */}
			</div>
			<div>
				<textarea
					placeholder="Title..."
					className="w-full border-none rounded-lg mt-3 font-bold text-4xl outline-none focus:border-none hove:border-none scroll-m-0"
				/>
				{/* <textarea
					placeholder="Write a post............."
					className="w-full border-none rounded-lg mt-3 text-xl outline-none focus:border-none hove:border-none scroll-m-0"
				/> */}
				<div>
					<ReactQuill
						placeholder="Write a post............."
						value={value?.post}
						modules={modules}
						formats={formats}
						onChange={handleChange}
						className="h-40 text-base"
						theme="snow"
					/>
				</div>
			</div>
		</div>
	);
};

export default Draft;
