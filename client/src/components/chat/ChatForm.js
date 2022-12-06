import { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { POST_MESSAGE } from "../../api/messageApi";
import { userId, user } from "../../store/user";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";

const ChatForm = ({userId, user}) => {
  const [text, setText] = useState("");
  const [postMessage] = useMutation(POST_MESSAGE);

  const sendMessage = () => {
    postMessage({
      variables: {
        messageInput: {
          text: text,
          userName: user,
          userId
        }
      },
    });
    setText("");
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            sendMessage();
          }
        }}
      />
      <Button
        variant="outline-secondary"
        // variant="primary"
        id="button-addon2"
        onClick={() => {
          if (text.length) {
            sendMessage();
          }
        }}
      >
        Button
      </Button>
    </InputGroup>
  );
};

const mapStateToProps = createStructuredSelector({
  userId,
  user
})

export default connect(mapStateToProps)(ChatForm);
