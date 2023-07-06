/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction} from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';




type EditorProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

const TinyEditor: React.FC<EditorProps> = ({ content, setContent }) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['code-block', 'emoji'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <>
      <ReactQuill
        value={content}
        modules={modules}
        onChange={setContent}
        theme="snow"
        className="min-h-[300px] "
      />
    </>
  );
};

export default TinyEditor;
