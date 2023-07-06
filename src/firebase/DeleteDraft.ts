import { db } from '../firebase/firebaseConfig';
import { doc, deleteDoc, collection } from 'firebase/firestore';

export const deleteDraft = async (draftId: string) => {
  const collectionRef = collection(db, 'Drafts');
  const draftRef = doc(collectionRef, draftId);
  await deleteDoc(draftRef);
};