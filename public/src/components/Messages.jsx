import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid";

export default function Messages({messages, handleSendMsg}) {
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <Container>
            <div className="chat-messages">
            {
                messages.map((message)=>{
                return (
                    <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? "sended":"recieved"}`}>
                        <div className="content"><p>{message.message}</p></div>
                    </div>
                    </div>
                )
                })
            }
            </div>
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
    )
}

const Container = styled.div`
display: grid;
  grid-template-rows: 95% 15% 10%;
  gap: 0.5rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 110% 15% 10%;
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
      background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;