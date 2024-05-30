import React from 'react';

function AvatarSelector({ avatars, selectedAvatar, setSelectedAvatar }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg mb-2">Select Avatar</h3>
      <div className="flex space-x-4">
        {avatars.map((avatarOption, index) => (
          <img
            key={index}
            src={`/${avatarOption}`}
            alt={`avatar-${index}`}
            className={`w-16 h-16 rounded-full cursor-pointer ${selectedAvatar === avatarOption ? 'border-4 border-primary' : 'border-2 border-gray-300'}`}
            onClick={() => setSelectedAvatar(avatarOption)}
          />
        ))}
      </div>
    </div>
  );
}

export default AvatarSelector;