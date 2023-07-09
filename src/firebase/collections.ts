/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bookmark, Feed, MyUser } from '../constant/types'

import {
  CollectionReference,
  DocumentData,
  collection,
  
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const userCol = createCollection<MyUser>('users');
export const feedCol = createCollection<Feed>('Feeds');
export const bookmarkCol = createCollection<Bookmark>('Bookmarks');