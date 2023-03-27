import React from "react";
import styled from "styled-components";
import { MdVideoCall } from "react-icons/md";

export default function VideoCallBtn({setVideocall, videocall}) {
    const handleClick = async () => {
      setVideocall(!videocall);
    };
  return (
    <Button onClick={handleClick}>
      {
        !videocall && (
          <>
            <MdVideoCall/><h4>Video Call</h4>
          </>
        )
      }
      {
        videocall && (
          <h4>Back</h4>
        )
      }
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  border-radius: 0.5rem;
  background-color: red;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  color: #ebe7ff;
  h4 {
    font-size: 0.9rem;
    color: #ebe7ff;
    margin: 0.3rem;
  }
  `;