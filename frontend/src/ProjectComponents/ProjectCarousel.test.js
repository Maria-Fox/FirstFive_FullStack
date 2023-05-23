import { render, getByText, waitFor } from "@testing-library/react";
import ProjectCarousel from "./ProjectCarousel";
import UserContext from "../UserComponents/UserContext";
import { MemoryRouter } from "react-router-dom";
import { authUser } from "../TestUtils";
import API from "../API";
jest.mock("../API");

describe("Renders ProjectCarousel", function () {

  test("Smoke - render project carousel", function () {

    const validUser = { username: "softwareDev1", matchedProjectIds: [] };

    render(
      <UserContext.Provider value={validUser}>
        <MemoryRouter>
          <ProjectCarousel />
        </MemoryRouter>
      </UserContext.Provider>
    )
  });

  test("Carousel populates projectData post API call", function () {
    const validUser = { username: "softwareDev1", matchedProjectIds: [] };

    // Mock API call & result.

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return {
            id: 2,
            owner_username: "uxDesProf",
            name: "Re-design an existing e-commerce website",
            project_desc: "Re-design amazon, or target /any larger online corporation..",
            timeframe: "2-3 months, unsure",
            github_repo: "https://github.com/"
          }
        }
      }
    })

    let renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={validUser}>
          <ProjectCarousel />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(getByText("Re-design an existing e-commerce website")).toBeInTheDocument();
      expect(getByText("2-3 months, unsure"));
    })
  });
});