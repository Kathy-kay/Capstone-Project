/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import { CreateFeed } from '../../constant/types'
import EditHeader from '../header/EditHeader'
import CreateFeedForm from './CreateFeedForm'
import PreviewFeed from './PreviewFeed'


const CreateFeeds:React.FC = () => {
    const [preview, setPreview] = useState(false);
  const [feed, setFeed] = useState<CreateFeed>({
    title: '',
    image: null,
    imageUrl: '',
    tags: [],
  });
  const [content, setContent] = useState('');
  return (
      <section className='bg-biege'>
        <EditHeader setPreview={setPreview}/>
        <div className="w-10/12 max-w-4xl mx-auto py-24">
          {preview ? (
    <PreviewFeed content={content} {...feed} />
  ) : (
    <CreateFeedForm
      setContent={setContent}
      content={content}
      feed={feed}
      setFeed={setFeed}
    />)}
        </div>
      </section>
    
  );
}

export default CreateFeeds
