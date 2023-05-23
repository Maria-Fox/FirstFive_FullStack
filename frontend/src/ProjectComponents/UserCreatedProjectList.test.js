import { render, getByText, waitFor } from "@testing-library/react";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils"
import { MemoryRouter } from "react-router-dom";
import UserCreatedProjectList from "./UserCreatedProjectList";
import API from "../API";
jest.mock("../API");

describe("<UserCreatedProjectList />", function () {

  test("Component renders w/o crashing", function () {

    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UserCreatedProjectList />
        </UserContext.Provider>
      </MemoryRouter>
    )
  });

  test("Re-renders with projectData", function () {

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          {
            [
              {
                id: 1,
                owner_username: "softwareDev1",
                name: "Made by SoftwareDev1",
                project_desc: "Desc here",
                timeframe: "1 day",
                github_repo: "github.com"
              }
            ]
          }
        }
      };
    });

    let renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UserCreatedProjectList />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(renderedBody.getByText("Made by SoftwareDev1")).toBeInTheDocument();
      expect(renderedBody.getByText("Desc here"))
    });

  })
})