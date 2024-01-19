const mongoose = require('mongoose');

const http = require('http');

const app = require('./app');

const Role = require('./api/models/role');

async function initDB() {
    
    const roles = await Role.find({});
    if(roles.length > 0) {
        return;
    }else {
        const admin = new Role({
            name : 'ADMIN',
             _id:mongoose.Types.ObjectId()
        })
        admin.save();
        const customer = new Role({
            name : 'CUSTOMER',
             _id:mongoose.Types.ObjectId()
        });
        customer.save();

        const nutritionist = new Role({
            name : 'NUTRITIONIST',
             _id:mongoose.Types.ObjectId()
        });
        nutritionist.save();
    }
}

initDB();



const port = process.env.PORT || 8000;

const server = http.createServer(app);

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//     console.log("Connected to socket.io");
    
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
    
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
    
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });

server.listen(port);
