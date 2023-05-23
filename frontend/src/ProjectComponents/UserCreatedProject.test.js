import { render, getByText } from "@testing-library/react";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import { MemoryRouter } from "react-router-dom";
import UserCreatedProject from "./UserCreatedProject";
jest.mock("../API");

describe("<UserCreatedProject /> ", function () {

  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UserCreatedProject />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });


  test("Renders prop data passed fown from <UserCreatedProjectList />", function () {

    const renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <UserCreatedProject
            id={1}
            owner_username={"softwareDev1"}
            name={"Name of item passed from props"}
            project_desc={"Desc for prop item"}
            timeframe={"1 day"}
            github_repo={"www.github.com"}
            handleNavToEditProj={jest.mock()}
            handleDeleteProj={jest.mock()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(renderedContent.getByText("Name of item passed from props")).toBeInTheDocument();
    expect(renderedContent.getByText("Desc for prop item")).toBeInTheDocument();
  });


})