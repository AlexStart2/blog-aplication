import './CSSHome.css';
import logo from './Images/logo.gif';
import React from 'react';
import menuSVG from './Images/menu-outline.svg';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap';
import { useNavigate } from 'react-router-dom';



function NavigationBar() {

  const Navigate = useNavigate();
  const blocks = 'navbar-button';

  const NavBarMobile = () => {
    let o = document.getElementById('nav-opt').classList;
    if (o.value === 'navbar-options') {
      console.log('show');
      o.add('active');
    } else {
      o.remove('active');
    }
    console.log(o.value);
  }

  return (
    <>
      <Nav className='navbar'>
        <div className='navbar-general'>
          <Nav.Link href='/' ><img src={logo} alt="Turn it Green" className="logotip" /></Nav.Link>
          <div id='nav-opt' className='navbar-options'>
            <Nav.Link href='/' className={blocks}>Home</Nav.Link>
            <Nav.Link href='/search' className={blocks}>Search</Nav.Link>
            <Nav.Link className={blocks + ' last'}><button className='GetInTouchButton' onClick={() => { Navigate('#') }}>Get in Touch</button></Nav.Link>
          </div>
          <button onClick={() => { NavBarMobile() }} className='Menu'><img src={menuSVG} alt='menuButton' /></button>
        </div>
      </Nav>
    </>
  );
}

export default NavigationBar;
