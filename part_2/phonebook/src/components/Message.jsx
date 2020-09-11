import React from "react";
import "./Message.css";

const Message = ({ message }) => {
  return (
    <div className={message.success ? "success message" : "fail message"}>
      {message.info}
    </div>
  );
};

export default Message;
