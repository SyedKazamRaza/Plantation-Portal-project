const router = require("express").Router();
const _ = require("lodash");
const { Chat } = require("../models/chatModel");
const { Store } = require("../models/storeModel");
const {Users} = require("../models/usersModel")

router.get("/", (req, res) => {
  res.send("I am chat panel");
});

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

router.post("/addMessage", async (req, res) => {
  try {
    const userRole = req.body.role;
    let dateTime = getCurrentDateTime();
    const user1 = req.body.userID;
    const user2 = req.body.storeID;
    const msg = req.body.msg;
    const personNo = req.body.personNo;

    let firstUser = "";
    let secondUser = "";
    if(userRole === "cust")
    {
      firstUser = user1;
      secondUser = user2;
    }
    else{
      firstUser = user2;
      secondUser = user1;
    }

    const chatexist = await Chat.find({
      $and: [{ firstUser: firstUser }, { secondUser: secondUser }],
    });
    if (chatexist.length > 0) {
      const newMessage = {
        personNo: personNo,
        text: msg,
        time: dateTime,
      };
      const result = await Chat.updateOne(
        { _id: chatexist[0]._id },
        {
          lastMSgPerson: personNo,
          lastMSg: msg,
          lastMsgTime: dateTime,
          $push: { message: newMessage },
        }
      );
      return res.status(200).send("Add to Existing Chat.");
    }

    const obj = {
      lastMSgPerson: personNo,
      lastMSg: msg,
      firstUser: firstUser,
      secondUser: secondUser,
      lastMsgTime: dateTime,
      message: [
        {
          personNo: personNo,
          text: msg,
          time: dateTime,
        },
      ],
    };
    let newChat = new Chat(obj);
    const chat = await newChat.save();
    return res.status(200).send("Add to New Chat.");
  } catch (error) {
    return res.status(201).send("Chat not added." + error);
  }
});

router.get("/allChats/singleChat/:role/:id/:secondId", async (req, res) => {
  const userId = req.params.id;
  const secondId = req.params.secondId;
  const role = req.params.role;
  let userChat;
  if (role === "cust") {
    userChat = await Chat.find({
      $and: [{ firstUser: userId }, { secondUser: secondId }],
    }).sort({lastMsgTime: -1});
    return res.status(200).send(userChat[0].message);

  } else if(role === "seller"){
    userChat = await Chat.find({
      $and: [{ firstUser: secondId }, { secondUser: userId }]
    }).sort({lastMsgTime: -1});
    return res.status(200).send(userChat[0].message);
  }

});

router.get("/allChats/:id/:role", async (req, res) => {
  const userId = req.params.id;
  const userRole = req.params.role;
  console.log("Server USer ID: ", userId);
  console.log("Server USer role: ", userRole);

  if (userRole === "cust") {
    const userChat = await Chat.find({ firstUser: userId }).sort({lastMsgTime: -1});
    let storesArr = [];
    if (userChat) {
      for (let user of userChat) {
        const receiverUser = await Store.findOne({ _id: user.secondUser });
        if (receiverUser) {
          const store = _.pick(receiverUser, ["storeName"]);
          const obj = {
            store: store.storeName,
            lastMsg: user.lastMSg,
            lastMSgPerson: user.lastMSgPerson,
            secondUserID: user.secondUser,
          };
          storesArr.push(obj);
        }
      }
    }
    const result = [storesArr, userChat];
    res.status(200).json(result);
  } else {
    const sellerChat = await Chat.find({ secondUser: userId }).sort({lastMsgTime: -1});;
    let usersArr = [];
    if (sellerChat) {
      for (let user of sellerChat) {
        const receiverUser = await Users.findOne({ _id: user.firstUser });
        if (receiverUser) {
          const store = _.pick(receiverUser, ["username"]);
          const obj = {
            store: store.username,
            lastMsg: user.lastMSg,
            lastMSgPerson: user.lastMSgPerson,
            secondUserID: user.firstUser,
          };
          usersArr.push(obj);
        }
      }
    }
    const result = [usersArr, sellerChat];
    res.status(200).json(result);
  }
});

module.exports.chatRouter = router;
