import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  const { receiverId } = useParams(); // Get ID from URL
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // 1. Join Socket Room
    socket.emit('join', user._id);

    // 2. Load old messages
    fetch(`http://localhost:3000/user/messages/${user._id}/${receiverId}`)
      .then(res => res.json())
      .then(data => setMessages(data));

    // 3. Listen for new messages
    socket.on('receive_message', (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket.off('receive_message');
  }, [receiverId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('send_message', { sender: user._id, receiver: receiverId, message });
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto h-[80vh] flex flex-col border rounded p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded-lg max-w-[80%] ${m.sender === user._id ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 self-start"}`}>
            {m.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input className="border flex-1 p-2 rounded" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message..."/>
        <button type="submit" className="bg-brand text-white px-4 rounded">Send</button>
      </form>
    </div>
  );
};

export default Chat;