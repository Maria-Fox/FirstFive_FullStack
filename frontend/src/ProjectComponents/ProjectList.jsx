import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import ProjectCard from "./ProjectCard";
import confetti from "canvas-confetti";
import AlertNotification from "../Common/AlertNotifications";
import { Card, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import "./ProjectList.css";


const ProjectList = () => {

  // ***************************************************************


  let {authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);

  let [projects, setProjects] = useState(null);
  const [errors, setErrors] = useState(null);

  // ***************************************************************

  useEffect(function viewAllProjects() {
    async function getAllProjects() {

      try {
        if (matchedProjectIds.length === 0) {
          let response = await API.getAllProjects();
          setProjects(response);
        } else {
          let response = await API.getNonMatchedProjects();
          setProjects(response);
        }
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    getAllProjects();

  }, [setMatchedProjectIds, setProjects, authUser]);

  // ***************************************************************


  let handleMatch = async function (authUser, id) {
    try {
      await API.addMatch(authUser, id);

      // Add the project to matches.
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);

      // Update displayed unmatched projects, removing the latest match.
      setProjects(projects.filter(projects => projects.id !== id));
      confetti();
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // ***************************************************************

  let noProjectsToMatch = (
    <Card className="m-3 p-3">
      <CardText style={{ textAlign: "center" }}>No projects left to match. Come back and check again soon!</CardText>
    </Card>
  );

  // ***************************************************************

  return (
    <div className="container">
      <h1 className="text-center text-white pt-2 mt-2">Projects</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      <Card className="container pt-3 pb-3 mt-2 mb-4 bg-dark bg-gradient text-white d-flex justify-content-between">
        <CardText >

          <Link to="/projects/carousel" 
          id= "Project-links" className = "d-flex justify-content-between p-2"
          style = {{color: "whitesmoke", textDecoration: "none"}}
          >
            View the projects through match-cards <FontAwesomeIcon icon={regular('heart')} />
          </Link>

          <Link to="/projects/add" id= "Project-links" 
          className = "d-flex justify-content-between p-2"
          style = {{color: "whitesmoke", textDecoration: "none"}}>
            Create a project <FontAwesomeIcon icon={faEdit} /> 
          </Link>

        </CardText>
      </Card>

      {
        projects && projects.length > 0 ? projects.map(({ id, owner_username, name, project_desc, timeframe, github_repo }) =>
          <ProjectCard
            key={id}
            id={id}
            owner_username={owner_username}
            name={name}
            project_desc={project_desc}
            timeframe={timeframe}
            github_repo={github_repo}
            handleMatch={handleMatch}
          />
        )
          :
          noProjectsToMatch
      }
    </div >
  );
};

export default ProjectList;