import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Card, Button } from "reactstrap";


const MatchedUser = ({ user_matched, matched_user_bio, project_owner, addUserToProjectMember, project_id, isUserProjectMember }) => {

  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();


  // ***************************************************************

  // If function returns true they're matched. 
  // let buttonStyle = isUserProjectMember(user_matched) ? "ProjectMember" : "MatchedUser";

  // ***************************************************************

  let msgButton = (
    <Button m-3 outline color="info" onClick={sendMsgRequest}
    > Message {user_matched}</Button>
  );

  // ***************************************************************

  function sendMsgRequest() {
    navigate(`/messages/${authUser}/create/${user_matched}`)
  };

  // ***************************************************************


  return (
    <Card key={user_matched} className="m-3 p-3">
      <h1>{user_matched}</h1>
      <p>{matched_user_bio}</p>

      {authUser === project_owner && !isUserProjectMember(user_matched) ?
        <Button style = {{backgroundColor: "yellowGreen"}}
        onClick={() => addUserToProjectMember(project_id, user_matched)} >Add To Project Members</Button> 
          : 
          null}

      {authUser !== user_matched ? msgButton : null}

    </Card>
  );
};

export default MatchedUser;