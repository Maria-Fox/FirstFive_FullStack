import React from "react";
import confetti from "canvas-confetti";
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import "./Confetti.css"


const Confetti = () => {
  return (
    <Card className="text-center container" id="confetti-card">
      <CardTitle className="h1 p-3 m-3">Need a pick-me-up?</CardTitle>

      <CardBody >
        <CardText>
          You've worked hard to connect with team members and create valuable products. Celebrate your hard work by clicking the button to release confetti! This activates a reward-system releasing domaine creating that "feel good" sensation. 
        </CardText>

        <CardText>Want to learn more about dopamine and the reward system? Visit <a href="https://www.youtube.com/watch?v=f7E0mTJQ2KM" rel="noreferrer" target="_blank" id = "link">this two minute video</a>.</CardText>

      </CardBody>


      <Button outline color="info" className="align-items-md-center m-2"
        onClick={() => confetti({ spread: 300 })} >Confetti</Button>

    </Card >
  )
}

export default Confetti;