/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuth } from '../../context/AuthProvider';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

//  onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
// { post.reactions[name] }

const Reactions = ({ emojis, addReactions }: any) => {
  const { user } = useAuth();
  

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="text-base flex gap-2 items-center"
        name={name}
        onClick={() => {
          if (!user) {
          console.log(true);
            return;
          }
          addReactions(name);
        }}
      >
        <span>{emoji}</span>
        <span>{emojis[name]}</span>
      </button>
    );
  });

  return (
    <>
      <div className="flex flex-col h-full items-center pt-14 gap-3">
        {reactionButtons}
      </div>
      
    </>
  );
};

export default Reactions;