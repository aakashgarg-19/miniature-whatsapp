import axios from 'axios';
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { sendMessageRoute, getMessageRoute } from '../utils/APIRoutes';
import Messages from './Messages';
import VideoCall from './VideoCall';
import VideoCallBtn from './VideoCallBtn';

export default function ChatContainer({currentChat, currentUser, socket}) {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [videocall, setVideocall] = useState(false);

  useEffect(()=>{
    if(currentChat){
      const getMessages = async()=>{
        const res = await axios.post(getMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(res.data);
      };
      getMessages();
    }
    // eslint-disable-next-line
    },[currentChat]);
    
  const handleSendMsg = async (msg)=>{
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
                </div>
                <div className="username"><h3>{currentChat.username}</h3></div>
            </div>
            <VideoCallBtn setVideocall={setVideocall} videocall={videocall}/>
        </div>
        {
          !videocall && (
            <Messages messages={messages} handleSendMsg={handleSendMsg}/>
          )
        }
        {
          videocall && (
            <VideoCall/>
          )
        }
    </Container>
  )
}

const Container = styled.div`
display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    padding-top: 20px;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;