


import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;


// import React, { useEffect, useState } from 'react'
// import useConversation from '../statemanage/useConversation.js';
// import axios from "axios";


// function useGetMessage() {
//     const [loading, setLoading] = useState(false);
//     const { messages, setMessages, selectedConversation } = useConversation();



//     useEffect(() => {
//         const getMessages = async () => {
//             setLoading(true);
//             if (selectedConversation && selectedConversation._id) {
//                 try {

//                     const res = await axios.get(
//                         `/api/message/get/${selectedConversation._id}`
//                     )

//                     setMessages(res.data);
//                     setLoading(false);
//                 } catch (error) {
//                     console.log("Error in useGetMessages", error);

//                 }
//             }
//         }

//         getMessages()
//     }, [selectedConversation, setMessages])


//     return { messages, loading }
// }

// export default useGetMessage