const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function getCurrentDateTime() {
  const d = new Date();
  let h = d.getHours();
  let x = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  let m = d.getMinutes();
  m = m < 10 ? "0" + m : m;
  let date =
    month[d.getMonth()] + " " + d.getDate() + ", " + h + ":" + m + " " + x;
  return date;
}

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log("User Added..");
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("New user is connected..");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("Users array yet: ", users);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, msg, pnumber }) => {
    const user = getUser(receiverId);
    if (user) {
      let dateTime = getCurrentDateTime();
      io.to(user.socketId).emit("getMessage", {
        senderId,
        msg,
        dateTime,
        pnumber,
      });
    }
  });

  //when user disconnects
  socket.on("disconnect", () => {
    console.log("User Disconnected.");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
