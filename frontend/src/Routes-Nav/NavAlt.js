import React, { useContext, useState } from "react";
import UserContext from "../UserComponents/UserContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


const NavAlt = ({ logout }) => {

  // ***************************************************************

  let { authUser } = useContext(UserContext);
  let validToken = localStorage.getItem("token");
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(collapsed => !collapsed);

  // ***************************************************************

  if (!authUser && !validToken) {
    return (
      <div>
        <Navbar color="white" light>
          <NavbarBrand href="/" className="me-auto">
            FirstFive
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/auth/login">Login</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/auth/register">
                  Register
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/about">
                  About
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar color="white" light style={{ right: "0" }}>
          <NavbarBrand href="/home" className="me-auto">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>

              <NavItem >
                <NavLink href="/projects/umatched">
                  Projects
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={`/matches/${authUser}/all`}>
                  Matches
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={`/messages/${authUser}/all`}>
                  Messages
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={`/projects/created/by/${authUser}`}>
                  Posts
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={`/users/${authUser}`}>
                  Profile
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/confetti">
                  Confetti
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/auth/login" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    );
  };

};


export default NavAlt;