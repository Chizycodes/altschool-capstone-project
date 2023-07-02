import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import dayjs from 'dayjs';

export const getUser = async (id: string) => {
	const docRef = doc(db, 'users', id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!');
	}
};

export const getDate = (timestamp: any) => {
	const date = new Date(timestamp.seconds * 1000);
	const formattedDate = dayjs(date).format('D MMMM, YYYY');
	return formattedDate;
};

export const getReadTime = (content: string) => {
	const wordsPerMinute = 200;
	const numberOfWords = content.split(/\s/g).length;
	const readTime = Math.ceil(numberOfWords / wordsPerMinute);
	return readTime;
};

export const parseContent = (content: string) => {
	const parser = new DOMParser();
	const htmlDocument = parser.parseFromString(content, 'text/html');
	const textContent = htmlDocument.documentElement.textContent;
	return textContent;
};
