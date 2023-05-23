import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle } from "reactstrap"


const MessageCard = ({ id, message_from, message_to }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************

  return (
    <Card className="container MessageCard m-4 p-4">

      {/* Distinsigh between a "message to" & "message from" */}
      {message_from === authUser ? null : <CardTitle>Message from: {message_from}</CardTitle>}
      {message_to === authUser ? null : <CardTitle>Message to: {message_to}</CardTitle>}


      <Link style = {{color: "midnightBlue", textDecoration: "none"}}
        to={`/messages/${authUser}/read/${id}`} >See Details</Link>
    </Card>
  );
};

export default MessageCard;
