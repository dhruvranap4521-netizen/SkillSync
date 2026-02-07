import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./pages.css";

/* ---------------- HELPERS ---------------- */

const getLoggedUser = () => {
  const storedUser =
    localStorage.getItem("user") || localStorage.getItem("userInfo");
  if (!storedUser) return null;

  try {
    const parsed = JSON.parse(storedUser);
    return parsed._id || parsed.user?._id;
  } catch {
    return null;
  }
};

const getSender = (users) => {
  const loggedUserId = getLoggedUser();
  if (!users || !loggedUserId) return "Unknown";

  return users[0]._id === loggedUserId ? users[1].name : users[0].name;
};

/* ---------------- COMPONENT ---------------- */

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  /* ---------- FETCH ALL CHATS ---------- */

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3000/chat", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };

    fetchChats();
  }, []);

  /* ---------- FETCH MESSAGES ---------- */

  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:3000/chat/message/${selectedChat._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(data);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  /* ---------- AUTO SCROLL ---------- */

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- CREATE NEW CHAT ---------- */

  const createChat = async () => {
    const userId = prompt("Paste the User ID you want to chat with:");
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:3000/chat",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChats((prev) => [data, ...prev]);
      setSelectedChat(data);
    } catch (err) {
      console.error(err);
      alert("Failed to create chat");
    }
  };

  /* ---------- SEND MESSAGE ---------- */

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:3000/chat/message",
        { content: newMessage, chatId: selectedChat._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, data]);

      // update sidebar preview
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === selectedChat._id
            ? { ...chat, latestMessage: data }
            : chat
        )
      );

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="chat-container">
      {/* -------- SIDEBAR -------- */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>My Chats</h2>
          <button className="new-sync-btn" onClick={createChat}>
            + New Sync
          </button>
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`chat-item ${
                selectedChat?._id === chat._id ? "active" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="avatar">
                {(chat.isGroupChat
                  ? chat.chatName
                  : getSender(chat.users)
                )?.charAt(0)}
              </div>

              <div className="chat-info">
                <p className="chat-name">
                  {chat.isGroupChat ? chat.chatName : getSender(chat.users)}
                </p>
                <p className="chat-preview">
                  {chat.latestMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- CHAT WINDOW -------- */}
      <div className="chat-window">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h3>
                {selectedChat.isGroupChat
                  ? selectedChat.chatName
                  : getSender(selectedChat.users)}
              </h3>
            </div>

            <div className="message-area">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender._id === getLoggedUser()
                      ? "sent"
                      : "received"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <div className="input-area">
              <input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />

              <button className="send-btn" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a user to start syncing skills!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
