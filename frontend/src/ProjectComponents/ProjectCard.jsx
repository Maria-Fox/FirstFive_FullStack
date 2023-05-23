import React, { useContext } from "react";
import UserContext from "../UserComponents/UserContext";
import { Card, CardBody, CardSubtitle, CardTitle, Button, CardLink } from "reactstrap";


const ProjectCard = ({ id, name, project_desc, timeframe, github_repo, handleMatch }) => {

  // ***************************************************************

  // user can "match" a project, an alert shows, project is removed from display.
  let { authUser } = useContext(UserContext);

  // ***************************************************************

  return (
    <div className='m-2 p-2'>
      <Card >

        <CardBody >

          <CardTitle className="fw-bold fs-2">{name}</CardTitle>

          {github_repo ?  
          <CardLink href= {github_repo} 
          style = {{textDecoration: "none", color: "purple"}}
          >View Repository</CardLink> 
          : <p>No github repo added.</p>}

        <CardSubtitle className="mt-2">Project timeframe: {timeframe}</CardSubtitle>

          <CardBody className="p-5">
            {project_desc}
          </CardBody>

          <div style={{ display: "flex", justifyContent: "center" }}>

            <Button onClick={() => handleMatch(authUser, id)}
              color="secondary">
              Match
            </Button>


          </div>

        </CardBody>

      </Card>

    </div >
  )
};

export default ProjectCard;