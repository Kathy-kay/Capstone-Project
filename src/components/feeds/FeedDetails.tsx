/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import  { Dispatch, SetStateAction, useState } from 'react';
import  ReactMarkdown  from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import {
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import Comment from '../comments/Comment';
import CommentForm from '../comments/commentForm';
import Reactions from '../comments/Reactions';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { feedCol } from '../../firebase/collections';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Feed, IComment, Reaction } from '../../constant/types';
import { deleteDocu } from '../../utils/deleteDocu';

type FeedPageProps = {
  feed: Feed;
  comments: IComment[];
  emojis: Reaction;
  id: string;
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setEmojis: Dispatch<SetStateAction<Reaction>>;
};

 export type ActiveComment = {
  id: string;
  type: 'editing' | 'replying';
};

const FeedPage = ({
  feed,
  comments,
  emojis,
  id,
  setComments,
  setEmojis,
}: FeedPageProps) => {
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(
    null
  );

  const { user } = useAuth();
  const { currentUser } = getAuth();
  const navigate = useNavigate();

  const rootComments = comments.filter(
    (comment: IComment) => comment.parentId === null
  );

  const addComment = async (text: string, parentId: string | null = null) => {
    const commentData = {
      id: uuidv4(),
      author: {
        name: currentUser?.displayName!,
        id: currentUser?.uid!,
        profilePic: currentUser?.photoURL!,
      },
      createdAt: Timestamp.now(),
      body: text,
      parentId,
    };

    const commentsData = [commentData, ...comments];
    const feedData = {
      ...feed,
      comments: [...comments, commentData],
    };

    try {
      const feedRef = doc(feedCol, id);
      await updateDoc(feedRef, feedData);

      setComments(commentsData);
      console.log(commentsData);
    } catch (e: any) {
      console.log(e.message);
    }

    setActiveComment(null);
  };

  const updateComment = async (text: string, commentId: string) => {
    const updated = comments.map((comment: IComment) => {
      if (comment.id === commentId) {
        return { ...comment, body: text };
      }
      return comment;
    });

    const postData = {
      ...feed,
      comments: [...updated],
    };

    try {
      const feedRef = doc(feedCol, id);
      await updateDoc(feedRef, postData);

      setComments(updated);
    } catch (e: any) {
      console.log(e.message);
    }

    setActiveComment(null);
  };

  const deleteComment = async (commentId: string) => {
    if (window.confirm('Delete?')) {
      const updated = comments.filter(
        (comment: IComment) => comment.id !== commentId
      );

      const postData = {
        ...feed,
        comments: [...updated],
      };

      try {
        const feedRef = doc(feedCol, id);
        await updateDoc(feedRef, postData);

        setComments(updated);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  const deletePost = async () => {
    try {
      const feedRef = doc(feedCol, id);
      await deleteDocu(feedRef);
      navigate('/feeds');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getReplies = (commentId: string) => {
    return comments
      .filter((comment: IComment) => comment.parentId === commentId)
      .sort(
        (a: IComment, b: IComment) =>
          a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime()
      );
  };

  const addReactions = async (name: keyof Reaction) => {
    setEmojis((prevEmojis) => ({
      ...prevEmojis,
      [name]: prevEmojis[name]++,
    }));

    try {
      const feedRef = doc(feedCol, id);
      await updateDoc(feedRef, {
        ...feed,
        ...emojis,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const canDelete = user && currentUser?.uid === feed?.author?.id;

  return (
    <div className="container mx-auto mt-3 px-3 py-2 relative">
      {canDelete ? (
        <button
          onClick={deletePost}
          className="bg-red-500 absolute right-0 bottom-0 text-white px-4 py-2"
        >
          Delete Post
        </button>
      ) : null}
      <div className="flex gap-2">
        <div className="w-[10%]">
          <Reactions emojis={emojis} addReactions={addReactions} />
        </div>
        <div className="w-[90%]">
          <div className="mb-3">
            <button
              className="px-4 py-1 bg-slate-800 hover:bg-slate-950 text-slate-100"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
          <img
            src={feed?.imageUrl!}
            alt=""
            className="w-full object-cover"
            width={0}
            height={0}
          />
          <div className="flex gap-x-2 py-3">
            {feed?.tags?.map((tag, i) => (
              <p key={`p-${tag}-${i}`} className="text-base text-blue-600 mt-2">
                #{tag}
              </p>
            ))}
          </div>
          <h1 className="text-2xl text-gray-900 text-center mt-3">
            {feed?.title}
          </h1>
          <div className="space-y-2 mt-2">
            <p className="text-sm">
              Created By :{' '}
              <span className="font-bold">{feed?.author?.name}</span>
            </p>
            <p className="text-xs italic">
              CreatedAt: {feed.createdAt.toDate().toString()}
            </p>
          </div>
          <div className="mt-7">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              className="text-left prose max-w-prose mx-auto lg:prose-lg"
            >
              {feed.content}
            </ReactMarkdown>
          </div>
          <div className="mt-8">
           <CommentForm onSubmit={addComment} />
          </div>
          <div className="mt-5">
            {rootComments.length > 0 &&
              rootComments.map((comment: IComment) => {
                const { author, body, createdAt, id } = comment;
                return (
                  <Comment
                    key={comment.id}
                    author={author}
                    body={body}
                    createdAt={createdAt}
                    id={id}
                    replies={getReplies(id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;


