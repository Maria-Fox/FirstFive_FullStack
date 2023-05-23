import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle, CardText, Button, CardLink } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used



const MatchedProject = ({ name, owner_username, project_desc
  , project_id, timeframe, github_repo, handleUnmatch }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************

  const unMatchOption = (
    <Button outline color="danger" className="p-2 m-2"
      onClick={() => handleUnmatch(authUser, project_id)}
    >Unmatch Project</Button>
  )


  // ***************************************************************

  return (
    <Card className="m-5 p-4">

      <CardTitle  className="fw-bold fs-2">{name}</CardTitle>
      {/* <small>Created by {owner_username}</small> */}

      <div>
      <small >Created by {owner_username}</small>
        {authUser !== owner_username ?
          <>
              <Link 
              to={`/messages/${authUser}/create/${owner_username}`} style={{ color: "MediumVioletRed", textDecoration: "none" }} > <FontAwesomeIcon icon={regular('message')} /> Msg Creator</Link>
          </>
          :
          null}
      </div>

      {github_repo ?
          <CardLink 
          href={github_repo} target="_blank" rel="noreferrer" 
          style={{ color: "blue", textDecoration: "none"}}> 
          View Repository</CardLink>
          : null}

      <CardText className="fw-bold">Project Timeframe: {timeframe}</CardText>

      <CardText className="p-5 pt-2">{project_desc}</CardText>

      <div className="container" >
        {/* Buttons to View Project user matches, and project members */}

        <Link to={`/matches/${project_id}/users`} 
        className = "justify-content-between p-2 m-2"
        > 
          <Button> Project User Matches </Button>
        </Link>


        <Link to={`/projectmembers/${project_id}/users`} 
        className= "justify-content-between p-2 m-2"> 
          <Button>Project Members</Button>
        </Link>

        {/* Proejct owners cannot remove a match from projects they create*/}
        {authUser !== owner_username ? unMatchOption : null}

      </div>

    </Card>
  );
};

export default MatchedProject;