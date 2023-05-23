import { getByText, render } from "@testing-library/react";
import UserContext from "../UserComponents/UserContext";
import { UserProvider, validUser } from "../TestUtils";
import { MemoryRouter } from "react-router-dom";
jest.mock("../API");
import CarouselItem from "./CarouselItem";

describe("<CarouselItem />", function () {

  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserProvider>
          <CarouselItem />
        </UserProvider>
      </MemoryRouter>
    )
  });


  test("Renders data from props", function () {

    // handleMatch & skip functions are mocked.

    const renderedBody = render(
      <MemoryRouter>
        <UserContext.Provider value={validUser}>
          <CarouselItem
            name={"Mock SaaS Dashboard"}
            project_desc={"Design a SaaS dashboard showing account overview, stats, etc."}
            timeframe={"2-3 months, unsure"}
            github_repo={"https://github.com/"}
            handleMatch={jest.mock()}
            skip={jest.mock()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );


    expect(renderedBody.getByText("Mock SaaS Dashboard")).toBeInTheDocument();
    expect(renderedBody.getByText("Design a SaaS dashboard showing account overview, stats, etc.")).toBeInTheDocument();
  });
});
