import { MemoryRouter } from "react-router-dom";
import ProjectMember from "./ProjectMember";
import { userWithMatchState } from "../TestUtils";
import UserContext from "../UserComponents/UserContext";
import { render } from "@testing-library/react";


// username, handleRemoveProjMember

describe("<ProjectMember /> ", function () {

  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <ProjectMember
            handleRemoveProjMember={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    )
  });


  test("Props passed from ProjectMemberList display", function () {
    const renderedContent = render(<MemoryRouter>
      <UserContext.Provider value={userWithMatchState}>
        <ProjectMember
          username={"softwareDev1"}
          handleRemoveProjMember={jest.fn()}
        />
      </UserContext.Provider>
    </MemoryRouter>
    );

    expect(renderedContent.getByText("softwareDev1")).toBeInTheDocument();
  });
})