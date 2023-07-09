/* eslint-disable @typescript-eslint/no-unused-vars */
import { Feed } from '../constant/types';
import { feedCol } from './collections';
import { updateDoc, doc } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

export const bookmarksFn = async (
  documentId: string,
  userId: string,
  feeds: Feed[],
  setFeeds: Dispatch<SetStateAction<Feed[]>>
) => {
  const newFeeds = feeds.map((feed) => {
    if (feed.id === documentId) {
      const alreadyBookmarked = feed.bookMarkedBy?.includes(userId);
      if (alreadyBookmarked) {
        // Remove user ID from array
        const updatedBookmarks = feed.bookMarkedBy?.filter(
          (uid) => uid !== userId
        );
        const updatedFeed = { ...feed, bookMarkedBy: updatedBookmarks };
        return updatedFeed;
      } else {
        const updatedBookmarks = [...(feed.bookMarkedBy || []), userId];
        const updatedFeed = { ...feed, bookMarkedBy: updatedBookmarks };
        return updatedFeed;
      }
    } else {
      return feed;
    }
  });

  setFeeds(newFeeds);

  try {
    const documentRef = doc(feedCol, documentId);
    //  await documentRef.update({ bookMarkedBy: newFeed.bookMarkedBy });
    for (const newFeed of newFeeds) {
      if (newFeed.id === documentId) {
        await updateDoc(documentRef, newFeed);
        return;
      }
    }

    console.log('Successfully updated the document in Firestore');
  } catch (error) {
    console.error('Error updating the document in Firestore:', error);
  }
};