import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import MessageCard from "./MessageCard";
import { Card, CardText } from "reactstrap";


const MessageList = () => {

  // ***************************************************************

  const { username } = useParams();
  const { authUser } = useContext(UserContext);
  const [userMessages, setUserMessages] = useState(null);
  const [errors, setErrors] = useState(null)


  // ***************************************************************

  useEffect(() => {
    async function viewUserMessages() {
      try {
        let response = await API.getAllUserMessages(username || authUser);
        setUserMessages(response);
      } catch (e) {
        setErrors(e);
      }
    };
    viewUserMessages();
  }, [setUserMessages, username]);

  // ***************************************************************

  let noMsgs = (
    <Card className="container p-3">
      <CardText style={{ textAlign: "center" }}>No messages, yet!</CardText>
    </Card>
  );

  // ***************************************************************


  return (
    <div className="container">
      <h1 className="text-center text-white pt-2 mt-2">Messages</h1>

      <p className="text-white m-4 p-4">Messages can only be exhanged between users who have current mutual project matches. To create a message please visit your   
      <Link style = {{textDecoration: "none", color: "aquamarine"}}
      to={`/matches/${authUser}/all`}> matches</Link> and click on the user you want to message.
      </p>

      {errors ? <AlertNotification messages={errors} /> : null}

      {
        userMessages && userMessages.length > 0 ?
          userMessages.map(({ id, message_from, message_to, body, sent_at }) =>
            <MessageCard
              key={id}
              id={id}
              message_from={message_from}
              message_to={message_to}
              body={body}
              sent_at={sent_at}
            />
          )
          : noMsgs
      }
    </div >
  )
};

export default MessageList;