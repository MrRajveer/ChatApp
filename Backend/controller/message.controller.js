
import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../SocketIO/server.js";

// export const sendMessage = async(req,res)=>{
//     // console.log("send message how are you veryboy" , req.params.id, req.body.message);


//     try {
//         const {message} = req.body;
//         const{id:receiverId}= req.params;
//         const senderId = req.user._id; // current logged user

//         let conversation =await Conversation.findOne({
//             participants:{$all:[senderId,receiverId]}
//         });
//         if(!conversation){
//             conversation = await Conversation.create({
//                 participants:[senderId,receiverId],
//             })
//         }
//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message,
//         });

//         if (newMessage) {
//             conversation.messages.push(newMessage._id);
//           }
//            // await conversation.save()
//     // await newMessage.save();
//     await Promise.all([conversation.save(), newMessage.save()]); // run parallel

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }
//     res.status(201).json(newMessage);

//     // res.status(201).json({message:"message sent Sccussefully", newMessage})
    

        
//     } catch (error) {
//         console.log("Error in Sending message");
//         res.status(501).josn({message:"Internal Server error"})
        
        
//     }

    
// }

// export const getMessage = async(req,res)=>{

//     try {
//         const{id:chatUser}= req.params;
//         const senderId = req.user._id; // current logged user
//         const conversation =await Conversation.findOne({
//             participants:{$all:[senderId,chatUser]}
//         }).populate("messages");
//         if(!conversation){
//             return res.status(201).json([]);
//         }
//         const messages= conversation.messages;
//         res.status(201).json({messages});


        
//     } catch (error) {
//          console.log("Message getting error" + error);
//          res.status(501).json({error:"Internal Server error"})
         
        
//     }

// }
