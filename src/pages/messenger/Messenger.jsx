import { useContext, useEffect, useState, useRef } from "react";
import ChatOnline from "../../components/chatonline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import "./Messenger.css";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(`ws://localhost:8900`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((previous) => [...previous, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((following) =>
          users.some((user) => user.userId === following)
        )
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/conversation/${user._id}`
        );
        const conversations = await res.json();
        console.log(conversations);
        setConversations(conversations);
      } catch (error) {
        console.log(error.message);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/message/${currentChat?._id}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => scrollRef?.current?.scrollIntoView({ behavior: "smooth" }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await fetch(`http://localhost:8800/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const data = await res.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ messages });
  console.log({ user });

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for friends"
              className="chatMenuInput"
              type="text"
            />
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef} key={message._id}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Write something"
                    className="chatMessageInput"
                    value={newMessage}
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
