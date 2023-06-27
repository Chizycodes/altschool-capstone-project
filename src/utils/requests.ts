import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getUser = async (id: string) => {
		const docRef = doc(db, 'users', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			return docSnap.data();
		} else {
			// doc.data() will be undefined in this case
			console.log('No such document!');
		}
};