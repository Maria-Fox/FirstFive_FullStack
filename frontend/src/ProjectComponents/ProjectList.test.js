import { render, getByText, waitFor } from "@testing-library/react";
import ProjectList from "./ProjectList";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
// Mock API calls.
import API from "../API";
jest.mock("../API")


describe("ProjectList component- approp display", function () {

  test("Smoke - Render ProjectList component", function () {

    const validUser = { username: "softwareDev1", matchedProjectIds: [] };

    render(
      <UserContext.Provider value={validUser}>
        <MemoryRouter>
          <ProjectList />
        </MemoryRouter>
      </UserContext.Provider>
    )
  });


  test("Valid user, renders no project to display if no API call yet.", function () {

    const validUser = { username: "softwareDev1", matchedProjectIds: [] };

    //Not mocking API call- instead, disaplying no Projects

    const { asFragment, getByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={validUser}>
          <ProjectList />
        </UserContext.Provider>
      </MemoryRouter >
    );

    expect(getByText('Projects')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });


  test("Valid user, renders full project list WITH matchedprojects.", function () {

    const validUserContext = { username: "softwareDev1", matchedProjectIds: [] };

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          [{
            id: 4,
            owner_username: "Delia_Designs",
            name: "Design a smart TV APP layout",
            project_desc: "Beautifully design an interface for smart TV platforms. Include comprehnsive testing for all devices.",
            timeframe: "3-6 months",
            github_repo: "https://github.com/"
          }]
        }
      }
    });

    const renderedBody = render(
      <UserContext.Provider value={validUserContext} >
        <MemoryRouter>
          <ProjectList />
        </MemoryRouter>
      </UserContext.Provider >
    )

    waitFor(() => {
      expect(renderedBody.getByText("Design a smart TV APP layout")).toBeInTheDocument();
      expect(renderedBody.getByText("3-6months")).toBeInTheDocument();
    });
  });


});