/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Feed } from '../constant/types'
import { convertDate } from '../utils/convertDate';
import { Link } from 'react-router-dom';
import  { Dispatch, SetStateAction} from 'react';
import { BsBookmark } from 'react-icons/bs';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { deleteDoc, doc } from 'firebase/firestore';
import { feedCol } from '../firebase/collections';
import { useAuth } from '../context/AuthProvider';
import { bookmarksFn } from '../firebase/bookmark';

type FeedProp = {
  feed: Feed;
  // bookmarksFn: (documentId: string, userId: string) => Promise<void>;
  feeds: Feed[];
  setFeeds: Dispatch<SetStateAction<Feed[]>>;
};

const SingleFeed = ({ feed, setFeeds, feeds }: FeedProp) => {
  const { user } = useAuth();
  const handleBookMark = async () => {
    const feedId = feed?.id || '';
    const userId = user?.uid || '';
    await bookmarksFn(feedId, userId, feeds, setFeeds);
  };

  const deleteFeed = async () => {
    try {
      await deleteDoc(doc(feedCol, feed.id));
      alert('Feed Deleted Successfully');
      const newFeeds = feeds.filter((newFeed) => newFeed.id !== feed.id);
      setFeeds(newFeeds);
    } catch (error) {
      alert("Couldn't delete Feed");
    }
  };
  
  return (
    <>
      <div>
        <div className="shadow-md text-lg font-mono py-3 px-2 mt-10">
          <div>
            <Link
              to={feed?.id ? `feed/${encodeURIComponent(feed.id)}` : '#'}
            >
              <div className="w-full">
                {feed?.imageUrl ? (
                  <img
                    src={feed.imageUrl}
                    alt=""
                    className="w-full h-40 lg:h-[400px] object-cover"
                    width="0"
                    height="0"
                  />
                ) : null}
              </div>
            </Link>
            <div className="flex-grow">
              {feed?.tags && (
                <div className="flex gap-x-2 py-3">
                  {feed.tags.map((tag, i) => (
                    <p
                      key={`p-${tag}-${i}`}
                      className="text-base text-blue-600 mt-2"
                    >
                      #{tag}
                    </p>
                  ))}
                </div>
              )}
              {feed?.title && (
                <h2 className="font-semibold md:text-2xl mb-6">{feed.title}</h2>
              )}
              <div className="flex justify-between">
                {feed?.author && (
                  <div className="flex flex-col gap-3 items-center">
                    <div className="flex gap-x-1 items-center">
                      <div className="w-10 h-10 rounded-full border border-solid border-gray-400">
                        <img
                          alt={feed.author.name}
                          src={feed.author.profilePic!}
                          width="0"
                          height="0"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs">createdBy</p>
                        <p className="text-sm ">{feed.author.name}</p>
                      </div>
                    </div>

                    <p className="text-sm lg:text-base">
                      {convertDate(feed?.createdAt!)}
                    </p>
                  </div>
                )}
                <div className="flex gap-x-3 items-center pr-2 lg:pr-10">
                  {feed?.author?.id === user?.uid ? (
                    <>
                      <Link to={`/edit/${encodeURIComponent(feed.id!)}`}>
                        <AiOutlineEdit />
                      </Link>
                      <button onClick={deleteFeed}>
                        <AiOutlineDelete />
                      </button>
                    </>
                  ) : null}
                  <button onClick={handleBookMark}>
                    <BsBookmark
                      className={
                        feed?.bookMarkedBy?.includes(user?.uid!)
                          ? 'fill-yellow-400'
                          : ''
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleFeed;
