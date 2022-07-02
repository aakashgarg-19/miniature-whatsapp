import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hello from "../assets/hello.gif";

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
            <img src={Hello} alt="" />
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
    color: #b1e7b1;
    img {
     height: 10rem;
     width: 10rem;
     margin: 2rem;
    }
    span {
        color: #38e9c9;
    }
`;
