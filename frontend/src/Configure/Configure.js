import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle } from "reactstrap";
import "./Configure.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadingData] = useState(false);
  const navigate = useNavigate();

  // Created to update display & notify user when they can move on.
  setTimeout(() => {
    setLoadingData(true);
    setIsLoading(false);
    navigate("/projects/umatched");
  }, 1000);


  return (
    <div className="pt-5">
      <Card className="bg-dark text-center text-white container" id="home-div">
        {/* <Alert>Hi, {authUser}. </Alert> */}
        {isLoading ? <CardTitle>Loading your settings...</CardTitle> : null}

        {loadedData ?
          <CardTitle id="successLoaded">
            <FontAwesomeIcon icon={regular('circle-check')} />
            Success, move onto "projects" and begin matching!</CardTitle> :
          null}

        <Card className="border-0 mt-5">
          <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_caltkbh1.json"
            style={{
              background: "transparent", width: "70vw",
              height: "300px", borderRadius: "10px",
            }}
            autoplay>
          </lottie-player>
        </Card>
      </Card>
    </div >

  )
}

export default Home;