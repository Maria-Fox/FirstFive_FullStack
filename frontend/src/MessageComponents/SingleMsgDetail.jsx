import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import API from "../API";
import {
  Card
} from "reactstrap";
import AlertNotification from "../Common/AlertNotifications";

const SingleMsgDetails = () => {

  // ***************************************************************

  const { username, message_id } = useParams();
  const { authUser } = useContext(UserContext);

  const [msgDetails, setMsgDetails] = useState(null);
  const [errors, setErrors] = useState(null);

  // ***************************************************************


  useEffect(() => {
    async function viewMsgDetails() {
      try {
        let response = await API.viewSingleMsgData(message_id, username);
        setMsgDetails(response)
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    viewMsgDetails();
  }, [username, message_id]);




  // ***************************************************************

  return (
    <div className="container">

      {errors ? <AlertNotification messages={errors} /> : null}
      {msgDetails ?
        <div className="container p-5" >
          <Card className="p-4">
            <h1>Message from: {msgDetails.from_user.username}</h1>

            <h2>Message to: {msgDetails.to_user.username}</h2>

            <p>Sent: {msgDetails.sent_at}</p>

            {msgDetails.read_at ? <p>Read: {msgDetails.read_at}</p> : null}

            <Card className="m-1">
              <p className="p-2">
                {msgDetails.body}
              </p>
            </Card>


            {msgDetails.to_user.username === authUser ?
              <Link 
              to={`/messages/${authUser}/create/${msgDetails.from_user.username}`} style={{ color: "blue", textDecoration: "none" }}>
                Reply</Link>
              : null}
          </Card>
        </div>
        : <p>Loading ...</p>}




    </div >
  )
};

export default SingleMsgDetails;