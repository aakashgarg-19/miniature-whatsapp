import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const getCurrentUser = async () => {
            const data = await JSON.parse(
                localStorage.getItem("chat-app-login")
            );
            setUserName(data.username);
        }
        getCurrentUser();
    }, []);
    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
     height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`;
