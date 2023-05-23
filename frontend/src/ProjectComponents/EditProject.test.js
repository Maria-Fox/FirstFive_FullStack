import { render, waitFor } from "@testing-library/react";
import EditProject from "./EditProject";
import UserContext from "../UserComponents/UserContext";
import { MemoryRouter } from "react-router-dom";
import API from "../API";
import { authUser } from "../TestUtils";
jest.mock("../API")

describe("Rendering edit project form", function () {

  test("Smoke- Valid User- rendered edit project component.",
    function () {

      const authUser = { username: "softwareDev1" };

      render(
        <MemoryRouter>
          <UserContext.Provider value={authUser}>
            <EditProject />
          </UserContext.Provider>
        </MemoryRouter>
      );
    });

  test("Snapshot- matches project edit.", function () {

    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ username: "softwareDev1" }}>
          <EditProject />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Popualtes form w/ existing projectData", function () {
    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return {
            "owner_username": authUser,
            "name": "Tes name",
            "project_desc": "test desc",
            "timeframe": "1 day",
            "github_repo": "www.github.com"
          }
        }
      }
    });

    const renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={authUser}>
          <EditProject />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(renderedContent.getByText("1 day")).toBeInTheDocument();
    })

  })
});

