import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserComponents/UserContext';
import confetti from 'canvas-confetti';
import API from '../API';
import CarouselItem from "./CarouselItem";
import AlertNotification from '../Common/AlertNotifications';
import { Card, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used


function ProjectCarousel() {

  // **************************************************************

  const [projects, setProjects] = useState(null);
  const { authUser, setMatchedProjectIds } = useContext(UserContext);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function initiateCarousel() {
      try {
        let response = await API.carouselProjects();
        setProjects(response);
      } catch (e) {
        setErrors(e);
      }
    };

    initiateCarousel();
  }, [setProjects, setMatchedProjectIds]);


  // ***************************************************************

  let handleMatch = async function (authUser, id) {
    try {
      await API.addMatch(authUser, id);
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
      confetti({ spread: 300, particleCount: 250 });

      let newProjToDisplay = await API.carouselProjects();
      console.log(newProjToDisplay, "from handleMatch")
      setProjects(newProjToDisplay);
    } catch (e) {
      setErrors(e);
    };
  };

  // **************************************************************


  // User chooses not to match the project. Gets new random project.
  let skip = async function () {
    let newRandomProj = await API.carouselProjects();
    setProjects(newRandomProj);
  };

  // **************************************************************

  const noProjectsToDisplay = (
    <Card className='m-3 p-3'>
      <CardTitle> No projects left to match. Come back and check again soon!</CardTitle>
    </Card>
  );


    // **************************************************************



  return (
    <div className="text-center container">

      <h1 className="text-white pt-2 mt-2">Projects</h1>
      {errors ? <AlertNotification messages={errors} /> : null}


      <Card className='m-3 p-3'>
        <CardTitle>Use "X" to skip a project and the "<FontAwesomeIcon icon={regular('heart')} />" to match!</CardTitle>

        <small >Note: The projects displayed are all random projects you have not matched with. There is a small possibility you get two of the same projects back to back. If this happens, just "skip" again and you'll see a new project. Happy matching!</small>
      </Card>

      {!projects ? noProjectsToDisplay :
        <div>
          {projects.map(({ id, name, project_desc, timeframe, github_repo }) =>
            <CarouselItem
              key={id}
              id={id}
              name={name}
              project_desc={project_desc}
              timeframe={timeframe}
              github_repo={github_repo}
              handleMatch={() => handleMatch(authUser, id)}
              skip={skip}
            />)}
        </div>}
    </div>
  )
};

export default ProjectCarousel;