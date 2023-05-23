import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProject.css"
import { Button, Card, CardTitle, CardLink, CardBody, CardSubtitle } from "reactstrap";

const UserCreatedProject = ({ id, name, project_desc, timeframe, github_repo, handleNavToEditProj, handleDeleteProj }) => {

  const navigate = useNavigate();

// ***************************************************************

const handleNavToProjectMemberEdits = (id) => {
  navigate(`/projectmembers/update/${id}`)
};

// ***************************************************************



  return (
    <Card className="container p-3 m-3">

      <CardTitle className="fw-bold fs-2">{name}</CardTitle>
          <CardSubtitle >Project timeframe: {timeframe}</CardSubtitle>

          {github_repo ?  
          <CardLink href= {github_repo} 
          style = {{textDecoration: "none", color: "purple"}}
          >View Repository</CardLink> 
          : <p>No github repo added.</p>}

          <CardBody className="p-3">
            {project_desc}
          </CardBody>

      <Button outline color="info" onClick={() => handleNavToEditProj(id)}>Edit Details</Button>

      <Button outline color="secondary"
      onClick={() => handleNavToProjectMemberEdits(id)}>Update Project Members </Button>

      <Button outline color="danger " onClick={() => handleDeleteProj(id)}>Delete</Button>

    </Card >
  );

};

export default UserCreatedProject;