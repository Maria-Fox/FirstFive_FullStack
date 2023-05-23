import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import MatchedProject from "./MatchedProject";
import { Card, CardTitle } from "reactstrap";


const MatchedProjectList = () => {

  // ***************************************************************
  const { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);
  const [matchData, setMatchData] = useState(null);
  const [errors, setErrors] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    async function getMatchData() {
      try {
        let response = await API.viewUserMatches(authUser || username);
        setMatchData(response);

        // Update user matches state/ array.
        let matchingIDS = response.map(proj => proj.project_id);
        // Update based on matching projects at refresh.
        setMatchedProjectIds([...matchingIDS]);
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    getMatchData();
  }, [setMatchData, setMatchedProjectIds, username]);

  // ***************************************************************

  let handleUnmatch = async (username, project_id) => {
    try {
      let unmatchRes = await API.removeUserMatch(username, project_id);

      if (unmatchRes.Removed) {
        // reset the projects displayed to all except the deleted project.
        setMatchData(matchData.filter(ids => ids.project_id !== project_id));

        // Update the matchedIds in state for project rendering.
        let newIds = matchedProjectIds.filter(id => id !== project_id);
        setMatchedProjectIds(newIds);
      };
    } catch (e) {
      setErrors(e);
      return;
    }
  };

  // ***************************************************************

  let noMatchesYet = (
    <Card className="container p-3 text-center">
      <CardTitle>No matches, yet!</CardTitle>
      <Link to="/projects/umatched" className="pt-3">Visit projects to match</Link>
    </Card>
  );

  // ***************************************************************

  return (

    <div className="container">
      <h1 className="text-center text-white pt-2 mt-2">Matches</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      {matchData && matchData.length > 0 ? matchData.map(({ project_id, project_desc, name, owner_username, timeframe, github_repo }) =>
        <MatchedProject
          key={project_id}
          project_id={project_id}
          project_desc={project_desc}
          name={name}
          owner_username={owner_username}
          timeframe={timeframe}
          github_repo={github_repo}
          handleUnmatch={handleUnmatch}
        />
      )
        :
        noMatchesYet
      }

    </div>
  );
};

export default MatchedProjectList;