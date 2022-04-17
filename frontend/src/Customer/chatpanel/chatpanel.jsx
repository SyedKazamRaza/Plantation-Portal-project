import React, { useState, useEffect } from "react";
import "./chatpanel.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@mui/icons-material/Search";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";

import { io } from "socket.io-client";

import axios from "axios";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  date: {
    fontSize: 12,
    marginLeft: "3%",
    color: "gray",
  },
  textField: {
    marginTop: "7px",
    width: "85%",
  },
  startConversation: {
    fontSize: 40,
    color: "#B0B0B0",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "bold",
    marginTop: "12%",
    marginLeft: "8%",
  },
}));

function Chatpanel(props) {
  const classes = useStyles();
  const [msg, setMsg] = useState("");
  const [allStores, setAllStores] = useState([]);
  const [chatResult, setChatResult] = useState([]);
  const [stores, setStores] = useState([]);
  const [msgAdded, setMsgAdded] = useState(false);
  const [secondUserChat, setSecondUserChat] = useState([]);

  const [secondUserName, setSecondUserName] = useState("");
  const [secondUserID, setSecondUserID] = useState("");
  const [userRole, setUserRole] = useState(props.role);
  const [chatChanges, setChatChanges] = useState(false);

  const [searchChat, setSearchChat] = useState("");

  const [arrivalMsg, setArrivalMSg] = useState(null);
  let searchFieldData = "";

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    console.log("Socket is:", socket);

    socket.current.emit("addUser", props.userId);
    socket.current.on("getUsers", (users) => {
      console.log("Users available:", users);
    });
  }, [props.userId]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      let personNo;
      if (data.pnumber === 1) {
        personNo = 1;
      } else if (data.pnumber === 2) {
        personNo = 2;
      }
      setMsgAdded(true);
      setArrivalMSg({
        text: data.msg,
        personNo: personNo,
        time: data.dateTime,
      });
      setMsgAdded(false);
    });
  }, []);

  useEffect(() => {
    arrivalMsg && setSecondUserChat((prev) => [...prev, arrivalMsg]);

    axios
      .get(`http://localhost:5000/chat/allChats/${props.userId}/${userRole}`)
      .then((response) => {
        //   console.log("Getting data second time...");
        if (response.data[0].length > 0) {
          setChatResult(
            response.data[1].map((ch) => {
              return ch;
            })
          );
        }
      })
      .catch((err) => console.log(err));

    // console.log("After arrival of msg:", secondUserChat);
  }, [arrivalMsg, props.userId, userRole]);

  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   console.log("Calling scrol to btm");
  //   // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [secondUserChat]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/chat/allChats/${props.userId}/${userRole}`)
      .then((response) => {
        if (response.data[0].length > 0) {
          setChatResult(
            response.data[1].map((ch) => {
              return ch;
            })
          );
          setAllStores(
            response.data[0].map((st) => {
              return st;
            })
          );
          setStores(
            response.data[0].map((st) => {
              return st;
            })
          );
          // scrollToBottom();
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("hello");
    if (secondUserID === "" || props.userId === "") {
      return;
    }
    //  console.log("called due to msg added.");
    axios
      .get(`http://localhost:5000/chat/allChats/${props.userId}/${userRole}`)
      .then((response) => {
        if (response.data[0].length > 0) {
          setChatResult(
            response.data[1].map((ch) => {
              return ch;
            })
          );
          setAllStores(
            response.data[0].map((st) => {
              return st;
            })
          );
          setStores(
            response.data[0].map((st) => {
              return st;
            })
          );
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `http://localhost:5000/chat/allChats/singleChat/${userRole}/${props.userId}/${secondUserID}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          console.log("New Chat:- ", response.data);
          setSecondUserChat(
            response.data.map((mg) => {
              return mg;
            })
          );
        }
      })
      .catch((err) => console.log(err));
    // scrollToBottom();

    console.log(stores);
    console.log("......................................");

  }, [msgAdded]);
  function setMessage(event) {
    setMsg(event.target.value);
  }

  function submitMessage(event) {
    console.log("000");
    event.preventDefault();
    setMsgAdded(false);
    let personNo;
    if (userRole === "cust") {
      personNo = 1;
    } else if (userRole === "seller") {
      personNo = 2;
    }
    const chat = {
      role: userRole,
      userID: props.userId,
      storeID: secondUserID,
      msg: msg,
      personNo: personNo,
    };

    const senderId = props.userId;
    const receiverId = secondUserID;
    let pnumber;
    if (userRole === "cust") {
      pnumber = 1;
    } else {
      pnumber = 2;
    }

    socket.current.emit("sendMessage", {
      senderId,
      receiverId,
      msg,
      pnumber,
    });

    axios
      .post("http://localhost:5000/chat/addMessage", chat)
      .then((response) => {
        if (response.status === 200) {
          setMsg("");
          setMsgAdded(true);
          // let arr = [...secondUserChat,msg]
          // setSecondUserChat(arr);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.log(error));

    let searchedStores = allStores.filter((st) => {
      return st.store.toLowerCase().includes(searchChat);
    });
    console.log(searchChat);
    setStores(searchedStores);

  }

  function giveLastMsg(personNo, lastMsg) {
    if (userRole === "cust") {
      if (personNo === "1") {
        return "Me: " + lastMsg;
      } else {
        return lastMsg;
      }
    } else if (userRole === "seller") {
      if (personNo === "2") {
        return "Me: " + lastMsg;
      } else {
        return lastMsg;
      }
    }
  }

  function changeChat(secondUserId, username) {
    setMsgAdded(false);
    setChatChanges(false);
    if (secondUserId === "" || username === "") {
      return;
    }
    setMsgAdded(true);
    setChatChanges(true);

    // scrollToBottom();
    if (userRole === "cust") {
      const userChat = chatResult.filter(
        (chat) => chat.secondUser === secondUserId
      );
      setSecondUserChat(userChat[0].message);
    } else if (userRole === "seller") {
      const userChat = chatResult.filter(
        (chat) => chat.firstUser === secondUserId
      );
      setSecondUserChat(userChat[0].message);
    }
    let str = allStores.filter((st) => {
      return st.store.toLowerCase().includes(searchChat);
    });
    setStores(str);
    emptySearchField();

    //console.log("Store are:", stores);
    //console.log("search field is:", searchChat);
    //console.log("change chat is called..");

    setSecondUserID(secondUserId);
    setSecondUserName(username);

    // scrollToBottom();

    console.log("response: ", chatResult);
  }

  const applySeach = () => {
    // console.log(allStores);
    let newChat = allStores.filter((st) => {
      return st.store.toLowerCase().includes(searchFieldData);
    });
    if (newChat.length > 0) {
      console.log("New Chat is: ", newChat);
      setStores(newChat);
    } else {
      setStores([]);
    }
  };

  const changeSearchChat = (event) => {
    let search = event.target.value;
    search = search.toLowerCase();
    setSearchChat(search);
    searchFieldData = search;
    // console.log("hhere", searchFieldData);
    applySeach();
  };
  const emptySearchField = () => {
    setSearchChat("");
    setStores(allStores);
  };

  return (
    <div style={{ width: "100%", height: 623, backgroundColor: "#ebebfa" }}>
      <h1>Chat</h1>
      <div className={classes.root}>
        <Grid container>
          <Grid item md={1} sm={1} xs={1}></Grid>
          <Grid item md={3} sm={3} xs={3}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                border: "1px solid rgb(166, 166, 166)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* <Typography className={classes.descriptionTitle}>
                All Conversations
              </Typography> */}

              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "90%",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={searchChat}
                  autoComplete="off"
                  placeholder="search chat"
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                    }
                  }}
                  inputProps={{ "aria-label": "search chat" }}
                  onChange={changeSearchChat}
                />
                <IconButton
                  sx={{ p: "10px" }}
                  onClick={emptySearchField}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Paper>
            </Box>
          </Grid>

          <Grid item md={7} sm={7} xs={7}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ maxwidth: 365, bgcolor: "gray" }}
                  aria-label="recipe"
                >
                  {secondUserName[0] && secondUserName[0].toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography className={classes.title}>
                  {secondUserName}
                </Typography>
              }
              // subheader={"Store: Greenland"}
              sx={{
                backgroundColor: "white",
                overflow: "hidden",
                border: "1px solid rgb(166, 166, 166)",
              }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={1} sm={1} xs={1}></Grid>

          <Grid item md={3} sm={3} xs={3}>
            <Box
              sx={{
                width: "100%",
                height: 450,
                backgroundColor: "white",
                border: "1px solid rgb(166, 166, 166)",
                overflowY: "auto",
              }}
            >
              {stores.map((st, index) => {
                return (
                  <CardHeader
                    key={index}
                    avatar={
                      <Avatar
                        sx={{ maxwidth: 365, bgcolor: "gray" }}
                        aria-label="recipe"
                      >
                        {st.store[0] && st.store[0].toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={st.store}
                    subheader={giveLastMsg(st.lastMSgPerson, st.lastMsg)}
                    onClick={() => {
                      changeChat(st.secondUserID, st.store);
                    }}
                    className="hoverChat"
                    sx={{
                      backgroundColor: "white",
                      overflow: "hidden",
                      borderTop: "1px solid rgb(242, 242, 242)",
                      borderBottom: "1px solid rgb(242, 242, 242)",
                      height: 60,
                    }}
                  />
                );
              })}
            </Box>
          </Grid>

          <Grid item md={7} sm={7} xs={7}>
            <Box
              sx={{
                width: "100%",
                height: 385,
                backgroundColor: "white",
                border: "1px solid rgb(166, 166, 166)",
                overflowY: "auto",
              }}
            >
              {secondUserChat.length !== 0 ? (
                <div>
                  {secondUserChat.map((msg, index) => {
                    return msg.personNo === 1 ? (
                      <CardHeader
                        key={index}
                        avatar={
                          <Avatar
                            sx={{
                              width: "28",
                              height: "28",
                              bgcolor: "orange",
                            }}
                            aria-label="recipe"
                          >
                            {userRole === "cust"
                              ? "M"
                              : secondUserName[0].toUpperCase()}
                          </Avatar>
                        }
                        title={
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Typography className={classes.descriptionTitle}>
                              {userRole === "cust" ? "Me" : secondUserName}
                            </Typography>
                            <Typography className={classes.date}>
                              {msg.time}
                            </Typography>
                          </Box>
                        }
                        subheader={msg.text}
                        sx={{
                          backgroundColor: "white",
                          overflow: "hidden",
                          height: 60,
                        }}
                      />
                    ) : (
                      <CardHeader
                        key={index}
                        avatar={
                          <Avatar
                            sx={{ width: "28", height: "28", bgcolor: "green" }}
                            aria-label="recipe"
                          >
                            {userRole === "cust"
                              ? secondUserName[0].toUpperCase()
                              : "M"}
                          </Avatar>
                        }
                        title={
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Typography className={classes.descriptionTitle}>
                              {userRole === "cust" ? secondUserName : "Me"}
                            </Typography>
                            <Typography className={classes.date}>
                              {msg.time}
                            </Typography>
                          </Box>
                        }
                        subheader={msg.text}
                        sx={{
                          backgroundColor: "white",
                          overflow: "hidden",
                          height: 60,
                        }}
                      />
                    );
                  })}

                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <Typography className={classes.startConversation}>
                  Open a conversation to start a chat.
                </Typography>
              )}
              {/* {chatChanges ? <div ref={messagesEndRef} /> : <div></div>} */}
            </Box>

            <Box
              sx={{
                width: "100%",
                height: 65,
                backgroundColor: "white",
                borderBottom: "1px solid rgb(166, 166, 166)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              component="form"
              onSubmit={submitMessage}
            >
              <TextField
                id="outlined-full-width"
                label="Message"
                autoComplete="off"
                placeholder="Type a message"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                value={msg}
                onChange={setMessage}
                className={classes.textField}
                variant="outlined"
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Chatpanel;
