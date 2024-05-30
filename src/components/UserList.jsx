import React from 'react';

function UserList({ users }) {
  return (
    <div className="w-1/4 p-4 bg-white rounded shadow overflow-y-auto">
      <h2 className="text-xl mb-4">Members</h2>
      <ul className='divide-y divide-primary/50 '>
        {Object.values(users).map((user, index) => (
          <li key={index} className="p-2 flex items-center">
            <div className='flex flex-wrap'>

            <img src={`/${user.avatar}`} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>{user.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;