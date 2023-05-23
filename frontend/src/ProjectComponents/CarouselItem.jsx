import React from "react";
import { Link } from "react-router-dom";
import {Card, CardTitle, CardText, CardBody} from "reactstrap";
import "./CarouselItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used


const CarouselItem = function ({name, project_desc, timeframe, github_repo, handleMatch, skip }) {

  return (

    <div id = "card-container" className="container">

    {/* BG-1*/}
    {/* <Card id="CarouselItem-div-BG-1" >

    <CardTitle className="fs-1">{name}</CardTitle>
    </Card > */}

    {/* BG-2 */}
    {/* <Card id="CarouselItem-div-BG-2" >

    <CardTitle className="fs-1">{name}</CardTitle>
    </Card > */}


      {/* Card user matches with. */}
    <Card id="main-card" className="container">

      <CardTitle className="fw-bold fs-1">{name}</CardTitle>

      {github_repo ?
        <Link to={github_repo} style={{ color: "purple", "textDecoration": "none"}}
        >View Repository</Link>
        : null}


      <CardText className="mb-0 mt-2 fw-bold">Project Timeframe:</CardText>
      <CardText className="mt-0">{timeframe}</CardText>


      <CardBody className="mt-0 container">

        {project_desc}
      </CardBody>

      <div className="MatchOption">

        <button onClick={skip} className="SkipButton">
          X</button>

        <button onClick={handleMatch} className="MatchButton"
        ><FontAwesomeIcon icon={regular('heart')} /></button>


      </div>
    </Card >

    </div>
  )
};



export default CarouselItem;