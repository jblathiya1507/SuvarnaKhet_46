import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // User Icon
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Icon
import MicIcon from "@mui/icons-material/Mic"; // Mic Icon 🎤
import axios from "axios";

const Chatbox = () => {
  const [visible, setVisible] = useState(false); // Chat window visibility state
  const [messages, setMessages] = useState([
    { text: "Hi there 👋\nHow can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const fetchAIResponse = async () => {
    return "I'm a virtual assistant. How can I help you?";
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    // const aiResponse = await fetchAIResponse(input);
    // setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }]);

    const aiRes = await axios.get(`http://127.0.0.1:8000/send_ai_res`,{params:{"user_text":input}});
    console.log("AI:",aiRes.data.ai_text);
    setMessages((prev) => [...prev, { text: aiRes.data.ai_text, sender: "bot" }]);

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box>
      {/* Floating Chat Icon (Custom Image) */}
      {!visible && (
        <IconButton
          sx={{
            position: "fixed",
            bottom: "0px",
            right: "5px",
            // backgroundColor: "white",
            // color: "white",
            width: "100px", // Increased size
            height: "100px", // Increased size
            // "&:hover": { backgroundColor: "white" },
            zIndex: 9999, // Ensure it's above other content
          }}
          onClick={() => setVisible(true)} // Show chat window when clicked
        >
          <img
            src="/chat1.jpg" // Path to image in public folder
            alt="Chat"
            style={{
              width: "70px", // Adjust width to fit your design
              height: "70px", // Adjust height to fit your design
            }}
          />
        </IconButton>
      )}

      {/* Chatbox */}
      {visible && (
        <Paper
          elevation={5}
          sx={{
            position: "fixed",
            bottom: "80px", // Adjusted to ensure it doesn't overlap with the table
            right: "20px",
            width: "400px",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 10000, // Ensure chat window appears above other content
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#2E7D32",
              color: "white",
              padding: "15px 20px",
            }}
          >
            <Typography variant="h6">Virtual Assistant</Typography>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setVisible(false)} // Close chat window when clicked
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#F1F8E9",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    msg.sender === "bot" ? "flex-start" : "flex-end",
                  marginBottom: "10px",
                }}
              >
                {msg.sender === "bot" && (
                  <SmartToyIcon
                    sx={{ color: "#2E7D32", marginRight: "10px" }}
                  />
                )}
                <Box
                  sx={{
                    padding: "12px",
                    borderRadius: "10px",
                    maxWidth: "75%",
                    backgroundColor:
                      msg.sender === "bot" ? "#A5D6A7" : "#1B5E20",
                    color: msg.sender === "bot" ? "#333" : "white",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </Box>
                {msg.sender === "user" && (
                  <AccountCircleIcon
                    sx={{ color: "#1B5E20", marginLeft: "10px" }}
                  />
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input & Send Button */}
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px", // Match Send button shape
                  height: "40px", // Match Send button height
                  paddingRight: "8px", // Ensures proper spacing
                },
                "& .MuiInputBase-input": {
                  padding: "10px", // Adjust padding inside input
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <MicIcon sx={{ color: "#2E7D32" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              sx={{
                marginLeft: "10px",
                minWidth: "40px",
                height: "40px", // Adjusted height to match TextField
                backgroundColor: "#2E7D32",
                "&:hover": { backgroundColor: "#1B5E20" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSend}
            >
              <SendIcon fontSize="small" /> {/* Adjust icon size */}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Chatbox;
