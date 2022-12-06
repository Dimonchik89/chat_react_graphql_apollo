import { useEffect } from "react";
import { messages } from "../../store/message";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Message from "../message/Message";
import "../../style/chat.scss";

const ChatMessages = ({messages}) => {
  const content = messages?.map((item, i) => <Message key={i} message={item}/>)

  useEffect(() => {
    console.log("messages", messages);
  }, [messages])


  return (
    <div className="chat">
      {content}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  messages
})

export default connect(mapStateToProps)(ChatMessages);
