/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { CreateFeed } from '../../constant/types';
import {createFeed} from "../../firebase/CreateFeed"
import { auth, storage } from '../../firebase/firebaseConfig';
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import TagInput from './TagInputField';
import {createDraft} from "../../firebase/CreateDraft"
import { useNavigate } from 'react-router-dom';
import TinyEditor from './Editor';

type CreateFeedFormProps = {
  setFeed: Dispatch<SetStateAction<CreateFeed>>;
  setContent: Dispatch<SetStateAction<string>>;
  content: string;
  feed: CreateFeed;
};

const CreateFeedForm: React.FC<CreateFeedFormProps> = ({
  setContent,
  feed,
  setFeed,
  content,
}) => {
  const [error, setError] = useState({
    image: '',
    content: '',
    title: '',
    tags: '',
  });

  const [loading, setLoading] = useState({ feed: false, draft: false });
  const navigate = useNavigate()

  const handleFile = async (file: File) => {
    const { currentUser } = auth;
    setError({
      ...error,
      image: '',
    });

    const fileName = `${currentUser?.uid}-${file.name}-${uuidv4()}`;
    const imageRef = ref(storage, `coverImages/${fileName}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    setFeed((prev) => ({
      ...prev,
      image: url,
      imageUrl: '',
    }));
  };

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      image: '',
    });

    setFeed((prev) => ({
      ...prev,
      imageUrl: e.target.value,
      image: null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError({
      image: '',
      content: '',
      title: '',
      tags: '',
    });

    const { imageUrl, image, title, tags } = feed;

    if (!imageUrl && !image) {
      setError((prev) => ({
        ...prev,
        image: 'Please ensure you select an image or choose an imageUrl',
      }));
      return;
    }

    if (!content) {
      setError((prev) => ({
        ...prev,
        content: 'Please ensure content is not empty',
      }));
      return;
    }

    if (!title) {
      setError((prev) => ({
        ...prev,
        title: 'Please ensure title is not empty',
      }));
      return;
    }

    if (!tags.length) {
      setError((prev) => ({
        ...prev,
        tags: 'Tags Field cannot be empty',
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, feed: true }));


    const feedData = {
      ...feed,
      content,
    };
   
    const { error } = await createFeed(feedData);

    if (error) {
      setLoading((prev) => ({ ...prev, feed: false }));
      return;
    }

    setLoading((prev) => ({ ...prev, feed: false }));
    // Handle the redirect or further actions after successful feed creation

    navigate("/feeds")
  };
  const handleDraft = async () => {
    setLoading({
      ...loading,
      draft: true,
    });
    const feedData = {
      ...feed,
      content,
    };
    const { error } = await createDraft(feedData);
    if (error) {
    
      setLoading({
        ...loading,
        draft: false,
      });
      return;
    }
    
    setLoading({
      ...loading,
      draft: false,
    });
    // router.push('/feeds');
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full rounded-md min-h-[480px] shadow-sm border border-solid border-primary-blue bg-primary-blue py-8 px-4">
        <div className="relative">
          <input
            type="file"
            className="absolute opacity-0 h-0 w-0"
            id="fileInput"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFile(file);
              }
            }}
          />
          <label
            className="cursor-pointer mr-8 bg-gray-600  text-white py-2 px-4 rounded"
            htmlFor="fileInput"
          >
            Upload File
          </label>
          {feed.image ? (
            <span className="text-green-500">Image Uploaded</span>
          ) : null}
          {error.image && (
            <span className="text-red-500 block mt-1">{error.image}</span>
          )}
        </div>
        <div className="mt-6">
          <label htmlFor="unsplash" className="block text-slate-50 mb-1">
            Image From Unsplash
          </label>
          <div className="flex gap-x-3">
            <input
              type="text"
              id="unsplash"
              className="text-slate-900 w-11/12  border border-solid border-primary-blue px-3 py-4 rounded-md "
              value={feed.imageUrl}
              onChange={handleUrl}
            />
            {/* {error.url && (
              <span className="text-red-500 block">
                {error.url}
              </span>
            )} */}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Add Title Here"
            className="text-2xl  text-slate-50 w-11/12 bg-transparent border border-solid border-primary-blue px-3 py-2 rounded-md "
            value={feed.title}
            onChange={(e) => {
              setError({
                ...error,
                title: '',
              });
              setFeed({
                ...feed,
                title: e.target.value,
              });
            }}
          />
          {error.title && (
            <span className="text-red-500 block">{error.title}</span>
          )}
        </div>
        <TagInput
          tags={feed.tags}
          setFeed={setFeed}
          error={error.tags}
          setError={setError}
        />
        <div className="mt-8">
          <label htmlFor="content" className="sr-only">
            Content
          </label>

          <TinyEditor content={content} setContent={setContent} />

          {error.content && (
            <span className="text-red-500 block">{error.content}</span>
          )}
        </div>
      </div>
      <div className="mt-8 flex gap-x-3">
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-4 rounded py-2 "
        >
          {loading.feed ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            'Publish'
          )}
        </button>
        <button
          type="button"
          className="cursor-pointer bg-gray-600 hover:bg-slate-900 text-white py-2 px-4 rounded "
          onClick={handleDraft}
        >
          {loading.draft ? (
            <div>
              {/* <Loader size="w-5 h-5" /> */}
              <p>Loading...</p>
            </div>
          ) : (
            'Save'
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateFeedForm;

