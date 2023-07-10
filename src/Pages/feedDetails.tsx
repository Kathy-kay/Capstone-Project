/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDoc, doc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import FeedPage from '../components/feeds/FeedDetails';
import { Feed, IComment, Reaction } from '../constant/types';
import { feedCol } from '../firebase/collections';


const Page = () => {
  const [feed, setFeed] = useState<Feed>({} as Feed);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<IComment[]>([]);

  const [emojis, setEmojis] = useState<Reaction>({
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  });


  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        try {
          const feedRef = feedCol;
          const docId = id as string;
          const feedSnapShot = await getDoc(doc(feedRef, docId));
          if (feedSnapShot.exists()) {
            const feedData = feedSnapShot.data();
            setFeed(feedData);
            if (feedData.comments) {
              setComments(feedData.comments);
            }

            if (feedData.reactions) {
              setEmojis(feedData.reactions);
            }
            setLoading(false);
          }
        } catch (e: any) {
          setLoading(false);
          console.log(e.message);
        }
      }
    };
    getPost();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      {!feed || !id ? (
        <h2 className="text-4xl">Wrong Link</h2>
      ) : (
        <FeedPage
          feed={feed}
          comments={comments}
          emojis={emojis}
          id={id as string}
          setComments={setComments}
          setEmojis={setEmojis}
        />
      )}
    </>
  );
};

export default Page;