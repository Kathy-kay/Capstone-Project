/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import PreviewFeed from './PreviewFeed';
import { getDoc, doc } from 'firebase/firestore';
import EditForm from './EditForm';
import { CreateFeed } from '../../constant/types';
import {  useParams } from 'react-router-dom';
import { feedCol } from '../../firebase/collections';

const EditFeed: React.FC= () => {
  const [preview, setPreview] = useState(false);
  const [feed, setFeed] = useState<CreateFeed>({
    title: '',
    image: null,
    imageUrl: '',
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  
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
            setContent(feedData.content);

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
      <section>
        <div className="w-10/12 max-w-4xl mx-auto pb-24">
          {!feed ? (
            <h2 className="text-4xl">Wrong Link</h2>
          ) : (
            <>
              {preview ? (
                <PreviewFeed content={content} {...feed} />
              ) : (
                <EditForm
                  setContent={setContent}
                  content={content}
                  feed={feed}
                  setFeed={setFeed}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default EditFeed;