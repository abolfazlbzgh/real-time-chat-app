import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SendIcon from './assets/SendIcon'
import Message from './components/Message';
import UserList from './components/UserList'
import AvatarSelector from './components/AvatarSelector'

const socket = io('https://main.d1al7xz791egw5.amplifyapp.com:4001'); // Connect to the Socket.IO server

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [users, setUsers] = useState({});

  const avatars = [
    'avatar-1.png',
    'avatar-2.png',
    'avatar-3.png',
    'avatar-4.png',
    'avatar-5.png',
    'avatar-6.png',
    'avatar-7.png',
    'avatar-8.png',
    'avatar-9.png',
  ];

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('users', (users) => {
      setUsers(users);
    });

    return () => {
      socket.off('message');
      socket.off('users');
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input); // Send message to the server
      setInput('');
    }
  };

  const handleSetUsername = () => {
    if (username.trim() && avatar) {
      socket.emit('setUsername', { username, avatar });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex h-screen p-4 bg-primary/5">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Enter your username and select an avatar</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded w-full mb-4"
              placeholder="Username"
            />
            <AvatarSelector avatars={avatars} selectedAvatar={avatar} setSelectedAvatar={setAvatar} />
            <button
              onClick={handleSetUsername}
              className="p-2 bg-primary text-white rounded w-full"
            >
              Join Chat
            </button>
          </div>
        </div>
      )}
      
      <UserList users={users} />
      <div className="flex-1 flex flex-col p-4 bg-white rounded shadow ml-4 ">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} isOwnMessage={msg.userId === socket.id} />
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-2 border rounded shadow"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 w-12 h-12 bg-primary text-white rounded shadow"
          >

            <SendIcon className="w-12 h-12" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
