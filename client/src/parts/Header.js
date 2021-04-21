import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Navbar style={{ background: 'white' }} className="smooth-shadow mx-auto">
      <Nav className="mx-auto">
        <Navbar.Brand href="#home">SoftUsers</Navbar.Brand>
      </Nav>
    </Navbar>
  );
}

export default Header;
