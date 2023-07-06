
import  { Dispatch, SetStateAction } from 'react';

const CreateHeader = ({
  setPreview,
}: {
  setPreview: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header>
      <nav className="w-10/12 mx-auto flex justify-end py-4">
        <ul className="flex gap-x-4">
          <li>
            <button onClick={() => setPreview(false)}>Edit</button>
          </li>
          <li>
            <button onClick={() => setPreview(true)}>Preview</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default CreateHeader;