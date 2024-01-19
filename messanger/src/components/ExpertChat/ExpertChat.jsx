import React, { useState, useEffect } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { format } from "date-fns";
import ScrollableFeed from "react-scrollable-feed";
import { useLoggedIn } from "auth/ApiService";
import { messagesList, initiateChat, sendMessage } from "messanger/ApiService";
import io from "socket.io-client";
import { API_SERVER } from "home/ApiService";
import "./expertChat.scss";
var socket;

const ExpertChat = ({ onClickContactUs }) => {
  const user = useLoggedIn();
  const [masterMessages, setNewMessages] = useState([]);
  const [content, setContent] = useState("");
  const [chatRoom, setChatRoom] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    if (loggedInUser && Object.keys(loggedInUser).length > 0) {
      initiateChat(loggedInUser.user._id, loggedInUser.token, (result) => {
        setChatRoom(result);
      });

      const user = {
        _id: loggedInUser.user._id,
        name: loggedInUser.user.fullName,
      };
      socket.emit("setup", user);
    }
  }, [loggedInUser]);

  useEffect(() => {
    socket = io(API_SERVER);
    socket.on("message recieved", (newMessageRecieved) => {
      setNewMessages((masterMessages) => [
        ...masterMessages,
        newMessageRecieved,
      ]);
    });
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
      console.log("Typing..? ");
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    if (chatRoom && Object.keys(chatRoom).length > 0) {
      messagesList(chatRoom._id, (res) => {
        setNewMessages(res);
      });
      socket.emit("join chat", chatRoom._id);
    }
  }, [chatRoom]);

  const toggle = () => {
    onClickContactUs();
  };

  const changeHandler = (event) => {
    const value = event.target.value;
    setContent(value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);

      socket.emit("typing", chatRoom._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatRoom._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const updateMessageList = () => {
    socket.emit("stop typing", chatRoom._id);
    sendMessage(
      chatRoom._id,
      user.user._id,
      content,
      loggedInUser.token,
      (result) => {
        setNewMessages([...masterMessages, result]);
        setContent("");
        socket.emit("new message", result);
      }
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateMessageList();
    }
  };

  function getFormattedDate(date) {
    const cdate = new Date(`${date}`);

    return format(cdate, "hh:mm");
  }

  return (
    <>
      <div>
        <div className="expert-text-container">
          <h3 className="expert-chat-title">EXPERT CHAT</h3>
          <AiOutlineCloseCircle
            size={26}
            style={{ marginBottom: "8px", cursor: "pointer" }}
            onClick={toggle}
          />
        </div>
        <div>
          <div>
            <div className="card chat-box ">
              <div
                className="card-body chat-content"
                style={{ height: "70vh" }}
              >
                <ScrollableFeed>
                  {masterMessages && masterMessages.length > 0
                    ? masterMessages.map((message, index) => {
                        if (message.sender && message.sender._id) {
                          if (message.sender._id === loggedInUser.user._id) {
                            // Left message..
                            return (
                              <div className="chat-item chat-right" key={index}>
                                <img src="" alt="" />
                                <div className="chat-details">
                                  <div className="chat-text">
                                    {message.content}
                                  </div>
                                  <div className="chat-time">
                                    {getFormattedDate(
                                      `${message.chat.createdAt}`
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div className="chat-item chat-left" key={index}>
                                <img src="" alt="" />
                                <div className="chat-details">
                                  <div className="chat-text">
                                    {message.content}
                                  </div>
                                  <div className="chat-time">
                                    {getFormattedDate(
                                      `${message.chat.createdAt}`
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }
                      })
                    : ""}
                  {istyping ? (
                    <div className="chat-item chat-left chat-typing">
                      {" "}
                      <img src="" />
                      <div className="chat-details">
                        <div className="chat-text"></div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </ScrollableFeed>
              </div>
              <div className="card-footer chat-form">
                <div id="chat-form d-flex flex-direction">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                    onChange={changeHandler}
                    value={content}
                    onKeyDown={handleKeyPress}
                  />
                  <button onClick={updateMessageList} className="btn">
                    <i className="far fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertChat;
