// name, owner_username, project_desc
// , project_id, timeframe, github_repo, handleUnmatch
import { render, getByText } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import MatchedProject from "./MatchedProject";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";


describe("<MatchedProject/>", function () {

  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedProject />
        </UserContext.Provider>
      </MemoryRouter>
    )
  });


  test("Renders project w/ props passed down", function () {

    const renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedProject
            name={"The project name"}
            owner_username={"Another user's proj"}
            project_desc={"Desc goes here"}
            github_repo={"github.com"}
            timeframe={"2 Days"}
            handleUnmatch={jest.mock()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );


    expect(renderedContent.getByText("The project name")).toBeInTheDocument();
    expect(renderedContent.getByText("Project Timeframe: 2 Days")).toBeInTheDocument();
  });


});