import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";

const About = () => {
  return (
    <Card className="container bg-dark text-white">
      <CardTitle tag="h1" className="text-center  p-2 mt-3">About FirstFive</CardTitle>


      <CardText>FirstFive is a group project collaboration app with a "dating-app" aspect for added fun!</CardText>

      <CardText>Here, users can review and match projects. Once a user has matched a project they can see a list of all other users who matched the project or are active project members. From there, matched users can begin messaging one another and move forward with the project.
      </CardText>

      <h3 className="text-center m-3 mt-5">Why was FirstFive created?</h3>
      <CardText>FirstFive was created to support early career professionals in gaining valuable collaboration experience.</CardText>

      <h4 className="text-center m-3 mt-5">Why the name FirstFive?</h4>
      <CardText>
        The typical computer science degree takes 4-5 years. Bootcamps vary. However, a common theme among both graduates is the idea that they have few projects to demonstrate their skills, or they are looking for group proejcts to strengthen their skills.
      </CardText>

      <CardText>
        FirstFive is intended for those with 0 - 5 years of experience in an indsutry. Instead of completing a degree or bootcamp with little or no projects here users can slowly build up their resume while aquiring necessary collaboration skills.
      </CardText>

      <CardText>
        Users of all skill levels and years of experience are welcome.
      </CardText>
    </Card>
  );
};

export default About;