import React, { Fragment } from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { fireBaseAuth } from "../firebase/firebaseAuth";
import { db } from "../firebase/firebaseAuth";
import { onValue, ref, set, push } from "@firebase/database";
import { useEffect } from "react";
import classes from "./Chat.module.css";
import Header from "./Header";
import {
  getAuth,
} from "firebase/auth";

// import { createRef } from "react";
// import { writeData } from "../firebase/Database";
const Chat = () => {
  const [contentState, setContentState] = useState("");
  const [chats, setChats] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  // const myRef = createRef();

  const userAuth = getAuth();

  const inputChangeHandler = (e) => {
    setContentState(e.target.value);
  };

  useEffect(() => {
    // const chatArea = myRef.current;
    setLoadingChat(true);
    try {
      const query = ref(db, "chats");
      onValue(query, (snapshot) => {
        let dataArr = [];
        snapshot.forEach((el) => {
          dataArr.push(el.val());
        });
        setChats(dataArr);
        // console.log(dataArr);
        setLoadingChat(false);
      });

      // chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
    }
  }, []);
  const chatSubmitHandler = async (e) => {
    e.preventDefault();
    // const chatArea = myRef.current;
    // not to send empty content
    if (contentState.trim().length === 0) {
      return;
    }
    const uid = userAuth.currentUser.uid;
    try {
      const messageRef = ref(db, "chats");
      const message = push(messageRef);
      set(message, {
        content: contentState,
        timeStamp: Date.now(),
        uid: uid,
      });

      setContentState("");

      // chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      console.log(error);
    }
  };
  const formatTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const time = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return time;
  };
  // console.log(userAuth.currentUser.uid );
  // console.log(chats.map(item=>item.uid[2]));
//   console.log(userAuth.currentUser);
// if(chats.map(item=>item.uid) === userAuth.currentUser.uid){
//   console.log(true);
// }else{
//   console.log(false);
// }
  const data = chats.map((chat) => {
    return (
      <p
        key={chat.timeStamp}
        className={
          "chat-bubble " +
          (userAuth.currentUser.uid === chat.uid ? "current-user" : "")
        }
      >
        {chat.content}
        <br />
        <span className="chat-time float-right">
          {formatTime(chat.timeStamp)}
        </span>
      </p>
    );
  });
  console.log(data);
  return (
    <Fragment>
      <Header />
      <div className="chat-area">
        {loadingChat ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
        {data}
      </div>

      <div>
        <form onSubmit={chatSubmitHandler} className="mx-3">
          <TextField
            variant="outlined"
            className={classes["form-control"]}
            onChange={inputChangeHandler}
            value={contentState}
          />
          <br />
          <button className="btn btn-submit px-5 mt-4" type="submit">
            Send
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Chat;
