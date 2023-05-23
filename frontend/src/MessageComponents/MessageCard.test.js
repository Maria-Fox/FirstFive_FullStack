import MessageCard from "./MessageCard";
import { render, getByText } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";

describe("<MessageCard /> ", function () {

  test("Smoke- renders w/o crashing.", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MessageCard />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });


  test("Component props are passed in & displayed", function () {

    let renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MessageCard
            id={1}
            message_from={"softwareDev1"}
            message_to={"Design_Delia"}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );


    expect(renderedContent.getByText("Message to: Design_Delia")).toBeInTheDocument();
  });

});