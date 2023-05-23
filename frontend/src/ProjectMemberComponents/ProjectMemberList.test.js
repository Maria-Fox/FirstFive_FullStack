import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import ProjectMemberList from "./ProjectMemberList";
import API from "../API";
jest.mock("../Api");

describe("<ProjectMemberList />", function () {

  test("Renders w/ o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <ProjectMemberList />
        </UserContext.Provider>
      </MemoryRouter>
    )
  });

  test("Renders data w/ useEffect response", function () {

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return [
            {
              "username": "monday",
              "bio": "monday afternoon"
            }
          ]
        }
      }
    });

    let renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <ProjectMemberList />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(renderedBody.getByText("monday")).toBeInTheDocument();
      expect(renderedBody.getByText("Not in the DOM")).not.toBeInTheDocument();
    });
  });


});