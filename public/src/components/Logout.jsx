import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(
          localStorage.getItem("chat-app-login")
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
          localStorage.clear();
          navigate("/login");
        }
      };
  return (
    <Button onClick={handleClick}>
      <h4>Logout</h4>
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 0 0 0 2rem;
  border-radius: 0.5rem;
  background-color: red;
  border: none;
  cursor: pointer;
  h4 {
    font-size: 0.9rem;
    color: #ebe7ff;
  }`;