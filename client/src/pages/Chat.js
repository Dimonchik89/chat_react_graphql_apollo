import { useState, useEffect } from "react";
import { useSubscription, useQuery, useLazyQuery } from "@apollo/client";
import ChatForm from "../components/chat/ChatForm";
import { SUBSCRIBE_MESSAGE, GET_MESSAGES } from "../api/messageApi";
import { AUTH_USER } from "../api/userApi";
import ChatMessages from "../components/chat/ChatMessage";
import { useNavigate } from "react-router-dom";
import { addAllMessages, addOneMessage } from "../store/message";
import { user, createUser } from "../store/user";
import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import "../style/chat.scss"

const Chat = ({addAllMessages, addOneMessage, createUser, user}) => {
  const { data, loading } = useQuery(GET_MESSAGES)
  const { data: newMessage } = useSubscription(SUBSCRIBE_MESSAGE);
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const [ auth, { data: newToken }] = useLazyQuery(AUTH_USER, {
    context: {
      headers: {
        authorization: `Bearer ${cookies?.token}`
      }
    }
  })
  

  useEffect(() => {
    if(!user) {
      if(!!cookies?.token) {
        const user = jwt_decode(cookies?.token)
        createUser(user)
      } else {
        navigate("/login")
      }
    }
  }, [])

  useEffect(() => {
    if (data?.messages?.length) {
      addAllMessages(data?.messages)
    }
  }, [data])

  useEffect(() => {
    console.log("ok");
    if(newMessage?.messageCreated) {
      addOneMessage(newMessage?.messageCreated)
    }
  }, [newMessage])

  return (
    <div className="chat-wrapper">
      <ChatMessages/>
      <ChatForm />
      <Link to="/login">
        Login
      </Link>
      <Link to="/register">
        Register
      </Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user
})

const mapDispatchToProps = dispatch => ({
  addAllMessages: bindActionCreators(addAllMessages, dispatch),
  addOneMessage: bindActionCreators(addOneMessage, dispatch),
  createUser: bindActionCreators(createUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
