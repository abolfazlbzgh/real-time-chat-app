import React from 'react';

function Message({ message, isOwnMessage }) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} `}>
      <div className="flex  items-end max-w-xs break-words  p-2 m-2">
        <img src={`/${message.avatar}`} alt="avatar" className={`${isOwnMessage ? ' hidden ' : 'visible'} w-8 h-8  rounded-full mr-2`} />
        <div className={`${isOwnMessage ? 'bg-primary text-white rounded-t-lg rounded-bl-lg' : 'bg-primary/20 text-black rounded-t-lg rounded-br-lg'} p-2  shadow-lg`}>
          {!isOwnMessage && <><strong className='font-extrabold'>{message.username} </strong><br/></>}
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default Message;