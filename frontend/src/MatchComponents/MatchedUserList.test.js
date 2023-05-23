import { getByText, render, waitFor } from "@testing-library/react";
import MatchedUserList from "./MatchedUserList";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import { MemoryRouter } from "react-router-dom";
import API from "../API";
jest.mock("../API");

describe("<MatchedUserList />", function () {

  test("It renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MatchedUserList />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  // test("Renders data post useEffect", function () {

  //   // THe API response is an object. Nested in array for now.
  //   API.mockImplementationOnce(() => {
  //     return {
  //       request: () => {
  //         [
  //           {
  //             "project_data": {
  //               "proj_owner": "monday",
  //               "proj_name": "made on 2/15",
  //               "proj_desc": "made on 2/15 this is the desc",
  //               "github_repo": "github.com",
  //               "timeframe": "2 days"
  //             },
  //             "user_matches": {
  //               "0": {
  //                 "user_matched": "monday",
  //                 "matched_user_bio": "monday afternoon"
  //               },
  //               "1": {
  //                 "user_matched": "feb13",
  //                 "matched_user_bio": "biooo"
  //               }
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   });

  //   const renderedBody = render(
  //     <MemoryRouter>
  //       <UserContext.Provider value={userWithMatchState}>
  //         <MatchedUserList />
  //       </UserContext.Provider>
  //     </MemoryRouter>
  //   );


  //   waitFor(() => {
  //     expect(renderedBody.getByText("made on 2/15")).toBeInTheDocument();
  //     expect(renderedBody.getByText("feb13")).toBeInTheDocument();
  //   });
  // });


});

