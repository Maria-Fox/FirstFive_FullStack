import React, { useEffect, useState } from "react";
import API from "../API";
import { useParams } from "react-router-dom";
import AlertNotification from "../Common/AlertNotifications";
import MatchedUser from "./MatchedUser";
import { Card} from "reactstrap";

const MatchedUserList = () => {
  // ***************************************************************

  const { project_id } = useParams();
  const [projData, setProjData] = useState(null);
  const [matchedUsers, setmatchedUsers] = useState(null);
  const [projectMembers, setProjectMembers] = useState(new Set([]));
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function viewAllMatchedUsers() {
      try {
        // Retrieve the users who matched the project + proj data.
        let response = await API.viewProjectUserMatches(project_id);
        let { project_data, user_matches } = response;

        // Set matches users + proj data.
        setmatchedUsers(user_matches);
        setProjData(project_data);

        // Retrieve users who are also project members 
        let projMemberData = await API.viewAllProjMembers(project_id);
        let allProjectMembers = projMemberData.map(user => user.username);
        setProjectMembers(new Set(allProjectMembers));

      } catch (e) {
        setErrors(e);
        return;
      }
    };

    viewAllMatchedUsers();
  }, [setProjData, project_id, setmatchedUsers, setProjectMembers]);


  // ***************************************************************

  let addUserToProjectMember = async function (project_id, username) {
    try {
      // If the user is already a project member escape.
      if(isUserProjectMember(username)) return;

      await API.addProjectMember(project_id, username);

      let projMemberData = await API.viewAllProjMembers(project_id);
      let allProjectMembers = projMemberData.map(user => user.username);
      setProjectMembers(new Set(allProjectMembers));
    } catch (e) {
      setErrors(e);
      return;
    };
  };


  // ***************************************************************

  function isUserProjectMember(username) {
    return projectMembers.has(username);
  };

  // ***************************************************************


  return (
    <div className="container">
      <h1 className="text-center text-white pt-2 mt-2">Matched Users</h1>
      {errors ? <AlertNotification messages={errors} /> : null}


      {projData && matchedUsers ?
        <Card className="p-3">

          {/* <CardTitle className="fw-bold fs-2"> {projData.proj_name}</CardTitle>
          <small >Created by {projData.proj_owner}</small>

          {projData.github_repo ?
              <CardLink href={projData.github_repo} target="_blank" rel="noreferrer" style={{ color: "purple", padding: "10px" }}> View Repo </CardLink>
              : null} */}
  

          {/* <CardText >Project Description: </CardText> */}
          {/* <CardText className="m-2 p-3 " >
            Project Description: {projData.proj_desc}
          </CardText> */}


          <div className="">
            {matchedUsers.map(({ user_matched, matched_user_bio }) =>
              <div key={user_matched}>

                <MatchedUser
                  user_matched={user_matched}
                  matched_user_bio={matched_user_bio}
                  project_owner={projData.proj_owner}
                  addUserToProjectMember={addUserToProjectMember}
                  project_id={project_id}
                  isUserProjectMember={isUserProjectMember}
                />

              </div>
            )}
          </div>

        </Card>

        : <p>"Loading..."</p>}
    </div>
  )
};

export default MatchedUserList;

