import { render } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { json, MemoryRouter } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { authUser } from "../TestUtils";

describe("Smoke- render ProjectCard", function () {

  test("Smoke- renders ProjectCard w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={authUser}>
          <ProjectCard />
        </UserContext.Provider>
      </MemoryRouter>
    )
  })

  test("Component has content thru props", function () {
    // props would be passed fown from ProjectList component.

    const renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={authUser}>
          <ProjectCard
            id={1}
            name={"TestProj"}
            project_desc={"test proj-desc"}
            timeframe={"2 days"}
            github_repo={"www.https:github.com"}
            handleMatch={jest.mock()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(renderedContent.getByText("TestProj")).toBeInTheDocument();
    expect(renderedContent.getByText("test proj-desc")).toBeInTheDocument();
    expect(renderedContent.getByText("Project timeframe: 2 days")).toBeInTheDocument();
  })
});