/* eslint-disable @typescript-eslint/no-explicit-any */

import { Feed } from '../constant/types';
import {
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import {  useEffect, useState } from 'react';
import SingleFeed from '../components/Feed';
import { feedCol } from '../firebase/collections';
import { Link } from 'react-router-dom';


const Feeds: React.FC= () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeeds = async () => {
      setLoading(true);
      try {
        const feedsRef = feedCol;
        const q = query(feedsRef, orderBy('createdAt', 'desc'));
        const feedsCollection = await getDocs(q);
        const feedsData = feedsCollection.docs.map((feed) => {
          return {
            ...feed.data(),
            id: feed.id,
          };
        });

        setFeeds(feedsData);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
        alert(err.message);
      }
    };
    getFeeds();
  }, []);

  if (loading)
    return (
      <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p>Loading...</p>
      </div>
    );

  return (
    <section>
      <div className="w-6/12 mx-auto">
        {feeds.length <= 0 ? (
          <div className="h-[90dvh] flex justify-center items-center">
            There are 0 feeds for you, you can{' '}
            <Link
              to="/new"
              className="inline-block ml-3 text-slate-50 px-6 py-1 bg-slate-800 hover:bg-slate-900 transition-all text-lg"
            >
              create one
            </Link>
          </div>
        ) : (
          <div>
            {feeds.map((feed) => {
              return (
                <SingleFeed
                  key={feed.id}
                  feed={feed}
                  setFeeds={setFeeds}
                  feeds={feeds}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feeds