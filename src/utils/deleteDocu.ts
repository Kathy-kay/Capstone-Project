/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteDoc } from 'firebase/firestore';

export const deleteDocu = async (docRef: any) => {
  await deleteDoc(docRef);
};