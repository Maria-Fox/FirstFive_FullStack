// user_matched, matched_user_bio, project_owner, addUserToProjectMember, project_id, isUserProjectMember

import { MemoryRouter } from "react-router-dom";
import MatchedUser from "./MatchedUser";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import { render } from "@testing-library/react";


describe("<MatchedUser />", function () {

  test("Renders w/o crashing", function () {

    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedUser
            isUserProjectMember={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    )
  });

  test("Renders w/ given props passed down from MatchedUserList", function () {

    const renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedUser
            user_matched={"Monday"}
            matched_user_bio={"Monday's bio"}
            project_owner={"Tuesday"}
            addUserToProjectMember={jest.fn()}
            project_id={43}
            isUserProjectMember={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(renderedContent.getByText("Monday")).toBeInTheDocument();
    expect(renderedContent.getByText("Monday's bio")).toBeInTheDocument();
  });
})