import './CSSHome.css';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap';



function Footer() {


  return (
    <>
      <Nav className='footer'>

        <div className='cmp-footer'>
          <div className='Copyright'>

            © [Year]-[Current Year] [Your Blog Name]. All rights reserved.<br /><br />

            All content on this blog web app, including text, images, graphics, and other
            materials, is the property of [Your Name] and is protected by copyright laws. You may not
            reproduce, distribute, display, or modify any of the content without the express written permission of [Your Name].<br />

            Unauthorized use or reproduction of the content may violate copyright, trademark,
            and other laws. If you wish to use or license any content from this blog, please contact
            [Your Contact Information] for permission.

            If you have any questions or concerns about this copyright notice, please contact
            us at [Your Contact Information].

          </div>
          <Nav.Link href='#' className='footElements'>Cookies</Nav.Link>
          <Nav.Link href='#' className='footElements'>Disclaimer</Nav.Link>
          <Nav.Link href='#' className='footElements'>Impresum</Nav.Link>
        </div>
      </Nav>
    </>
  );
}

export default Footer;
