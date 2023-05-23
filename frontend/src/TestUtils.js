// Used to create sample test user data & test UserContect provider..

import React from "react";
import UserContext from "./UserComponents/UserContext";

const authUser = {
  username: "softwareDev1"
};

// sample / data
const matchedProjectIds = [1, 2, 3, 4];

const userWithMatchState = { username: "softwareDev1", matchedProjectIds: [] };

// Creating a context provider and passing in the test user, matching ids. Passing in chidlren.
const UserProvider =
  ({ children, userWithMatchState }) => {
    <UserContext.Provider value={userWithMatchState}>
      {children}
    </UserContext.Provider>
  };

export { UserProvider, authUser, userWithMatchState };