import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./CommonUserProfile.css"

// Multiple areas where 
const CommonUserProfile = ({ username, bio }) => {

  const { authUser } = useContext(UserContext);

  let msgUserOption = (
    <button>
      <Link to={`/messages/${authUser}/create/${username}`}>Message {username}</Link>
    </button>
  )

  return (
    <div className="UserProfile">
      <h1>{username}</h1>

      <div>
        <p>
          {bio}
        </p>
      </div>

      {username === authUser ? null : msgUserOption}
    </div>

  );
};

export default CommonUserProfile;