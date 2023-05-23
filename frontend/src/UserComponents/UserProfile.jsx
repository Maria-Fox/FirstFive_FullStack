import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "./UserContext";
import AlertNotification from "../Common/AlertNotifications";
import { Card, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVcard} from "@fortawesome/free-regular-svg-icons";

const UserProfile = () => {
  const { username } = useParams();
  const { authUser, setAuthUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function userProfile() {
    async function viewUserProfile() {
      try {
        let user = await API.viewAuthUserProfile(username);
        setUserData({
          username: user.username,
          bio: user.bio,
          email: user.email
        });
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    viewUserProfile();
  }, [setUserData, username]);

  // ***************************************************************


  // Need guidance on how I can update an owner - component wise.
  let navigateToUpdate = () => {
    navigate(`/users/update/${authUser}`);
  };

  // ***************************************************************


  let handleDelete = () => {
    try {
      API.deleteUser(authUser);
      setAuthUser(null);
      localStorage.removeItem("token");
      navigate("/auth/register");
    } catch (e) {
      setErrors(e);
      return;
    }
  };

  if (!userData) return <p>Loading...</p>

  // The routes are the same jus the type of route (get vs path is diff) how do I move around that?
  let profileOptions = (
    <div className="ProfileOptions">
      <Button onClick={navigateToUpdate}>Update Profile Details</Button>
      <div style={{ paddingTop: "20px" }}>
        <p style={{ color: "red" }}>Danger Zone</p>
        <Button outline color="danger" onClick={handleDelete} >
          Delete Profile</Button>
      </div>
    </div>
  );


  return (
    <div className="container" >
      {errors ? <AlertNotification messages={errors} /> : null}

      <h1 className="text-center text-white pt-2 mt-2"> 
            <FontAwesomeIcon icon={faVcard} />
            Profile</h1>


      <Card className="p-3 text-center pt-4 mt-2">

        <div >
          <h2>Username: {userData.username}</h2>
          <p>Bio: {userData.bio}</p>
          <p>Email: {userData.email}</p>

          {profileOptions}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;