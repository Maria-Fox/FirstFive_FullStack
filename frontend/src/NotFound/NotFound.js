import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";


function NotFound() {
  return (
    <div className="text-white container pt-5">
      <h1 className="display-1 text-center">
        <FontAwesomeIcon icon={faHeartCrack} /> 404 Not Found{" "}
      </h1>
      <p className="text-center">
        The page you tried to go to doesn't exist. Use the NavBar to redirect to an existing page.
      </p>
    </div>
  );
}

export default NotFound;