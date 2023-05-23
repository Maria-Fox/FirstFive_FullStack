import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import UpdateProjectMembers from "./UpdateProjectMembers";
import API from "../API";
jest.mock("../Api");


describe("<UpdateProjectMembers />", function () {


  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UpdateProjectMembers />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  test("Renders useEffect data", function () {

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return [
            { username: 'monday', bio: 'monday afternoon' },
            { username: 'feb13', bio: 'biooo' }
          ]
        }
      }
    });

    const renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UpdateProjectMembers />
        </UserContext.Provider>
      </MemoryRouter>
    );


    waitFor(() => {
      expect(renderedBody.getByText("monday")).toBeInTheDocument();
      expect(renderedBody.getByText("User bio: biooo")).toBeInTheDocument();
    });

  });

  test("Renders no proj memebrs content if there's no users", function () {

    // returns empty array signaling no project members exist.
    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return []
        }
      }
    });

    const renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UpdateProjectMembers />
        </UserContext.Provider>
      </MemoryRouter>
    );


    waitFor(() => {
      expect(renderedBody.getByText("No project members, yet!")).toBeInTheDocument();
    });
  });

});