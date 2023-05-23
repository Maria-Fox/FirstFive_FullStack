import UserContext from "../UserComponents/UserContext";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";

describe("Render CreateProjectForm", function () {


  test("Smoke- Valid user renders create project form",
    function () {

      let authUserData = { username: "softwareDev1", matchedProjectIds: [] };

      render(
        <MemoryRouter>
          <UserContext.Provider value={authUserData} >
            <CreateProjectForm />
          </UserContext.Provider>
        </MemoryRouter>
      )
    });

  test("Snapshot- Valid user renders create project form",
    function () {

      let authUserData = { username: "softwareDev1", matchedProjectIds: [] };

      const { asFragment } = render(
        <MemoryRouter>
          <UserContext.Provider value={authUserData} >
            <CreateProjectForm />
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(asFragment()).toMatchSnapshot();
    });


})