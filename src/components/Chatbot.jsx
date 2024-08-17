import { IoSend } from "react-icons/io5";
import { BiUndo } from "react-icons/bi";
import { FaUndoAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [lastMessage, setLastMessage] = useState(""); // Store the last message

  useEffect(() => {
    // Initialize chat when the component mounts
    axios
      .post()
      .then()
      .catch((error) => {
        console.error("Error starting chat session:", error);
      });
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setLastMessage(message); // Store the current message

    try {
      const response = await axios.post(
        "https://burger-bot-backend.onrender.com/api/chat",
        {
          message,
        }
      );
      const botMessage = response.data.response;

      // Add both user message and bot response to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", text: message },
        { sender: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage(""); // Clear input field
  };

  const undoLastMessage = () => {
    setChatHistory((prevHistory) => prevHistory.slice(0, -2)); // Remove last user and bot messages
  };

  const retryLastMessage = () => {
    if (lastMessage) {
      setMessage(lastMessage); // Set the input field to the last message
      sendMessage(); // Resend the last message
    }
  };

  const deleteChatHistory = () => {
    setChatHistory([]); // Clear the chat history
  };

  return (
    <>
      <div className="backdrop-blur bg-white bg-opacity-40 w-full h-[400px] lg:h-[500px] rounded-xl overflow-auto p-8 text-sm sm:text-base">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={
              chat.sender === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            {chat.sender === "user" ? (
              <div className="bg-black text-white mt-5 px-4 py-2 rounded-s-xl rounded-tr-xl">
                {chat.text}
              </div>
            ) : (
              <div className="bg-white text-black mt-5 px-4 py-2 rounded-e-xl rounded-tl-xl">
                {chat.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <br />
      <div className="relative rounded-xl">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
          className="backdrop-blur bg-white bg-opacity-40 w-full h-[55px] lg:h-[75px] rounded-xl px-5 text-black placeholder-neutral-900 font-normal"
          placeholder="Type your message here..."
        />
        <IoSend
          className="absolute right-5 size-10 lg:size-12 p-2 top-[50%] translate-y-[-50%] text-neutral-700 hover:text-black transition-all ease-in-out duration-100 cursor-pointer"
          onClick={sendMessage}
        />
      </div>
      <br />
      <div className="flex gap-3 lg:gap-5">
        <div
          className="backdrop-blur bg-white bg-opacity-40 w-full h-[50px] lg:h-[75px] rounded-xl hover:bg-black hover:bg-opacity-25 cursor-pointer transition-all ease-in-out duration-200 flex items-center justify-center gap-1 lg:gap-2 text-black hover:text-neutral-300"
          onClick={undoLastMessage}
        >
          <BiUndo size={36} />
          <span className="text-sm lg:text-base">UNDO</span>
        </div>
        <div
          className="backdrop-blur bg-white bg-opacity-40 w-full h-[50px] lg:h-[75px] rounded-xl hover:bg-black hover:bg-opacity-40 cursor-pointer transition-all ease-in-out duration-200 flex items-center justify-center gap-2 lg:gap-3 text-black hover:text-neutral-300"
          onClick={retryLastMessage}
        >
          <FaUndoAlt size={22} />
          <span className="text-sm lg:text-base">RETRY</span>
        </div>
        <div
          className="backdrop-blur bg-white bg-opacity-40 w-full h-[50px] lg:h-[75px] rounded-xl hover:bg-black hover:bg-opacity-40 cursor-pointer transition-all ease-in-out duration-200 flex items-center justify-center gap-1 lg:gap-2 text-black hover:text-neutral-300"
          onClick={deleteChatHistory}
        >
          <MdDelete size={28} />
          <span className="text-sm lg:text-base">DELETE</span>
        </div>
      </div>
    </>
  );
}
