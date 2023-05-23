import { getByText, render, waitFor } from "@testing-library/react";
import MatchedProjectList from "./MatchedProjectList";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import { MemoryRouter } from "react-router-dom";
import API from "../API";
jest.mock("../API");

describe("<MatchedProjectList/>", function () {

  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedProjectList />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });


  test("Renders w/ zero matches", function () {

    // zero matches/ empty return array
    API.mockImplementationOnce(() => {
      return {
        request: () => {
          []
        }
      }
    });

    const renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedProjectList />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(renderedBody.getByText("No matches, yet!"));
    });
  });

  test("Renders w/ existing project matches", function () {

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          [
            {
              "project_id": 47,
              "project_desc": "made on 2/15 this is the desc",
              "name": "made on 2/15",
              "owner_username": "monday",
              "timeframe": "2 days",
              "github_repo": "github.com"
            },
            {
              "project_id": 21,
              "project_desc": "updated on wednesday",
              "name": "thurs123",
              "owner_username": "monday",
              "timeframe": "3 days",
              "github_repo": "github.com"
            }
          ]
        }
      }
    });

    const renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedProjectList />
        </UserContext.Provider>
      </MemoryRouter>
    );


    waitFor(() => {
      expect(renderedBody.getByText("made on 2/15")).tBeInTheDocument();
      expect(renderedBody.getByText("updated on wednesday")).toBeInTheDocument();
      expect(renderedBody.getByText("Cat in the hat - not in page")).not.toBeInTheDocument();

    });
  });

});