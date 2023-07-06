/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { auth, db } from '../firebase/firebaseConfig';
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';


export const updateDraft = async (feed: any, draftId: string) => {
  let imageUrl;

  if (feed.imageUrl) {
    imageUrl = feed.imageUrl;
  } else {
    imageUrl = feed.image;
  }
  const { currentUser } = auth;
  try {
    const collectionRef = collection(db, 'Drafts');
    const draftRef = doc(collectionRef, draftId);
    const draft = {
      title: feed.title,
      content: feed.content,
      author: {
        id: currentUser?.uid,
        name: currentUser?.displayName,
      },
      tags: feed.tags,
      createdAt: feed.createdAt,
      updatedAt: serverTimestamp(),
      imageUrl,
    };

    console.log(draft);

    await updateDoc(draftRef, draft);

    return { error: null };
  } catch (err: any) {
    return { error: err.message || 'An error occurred during feed creation.' };
  }
};