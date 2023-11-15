
import React from 'react';

const Footer = () => {
  return (
  <div className='container-flush p-3  footer'>
    <div className='row d-flex justify-content-center'>
      <div className='col-10 '>
        <div className='row'>
        <div className='col-12   col-md-3 col-sm-4  d-flex align-items-center justify-content-xl-end justify-content-center   footer-title-container' >
          <label className='footer-title'>ESEMBLY</label>
          </div>
          
          <div className='col-12 col-md-9 col-sm-8 d-flex align-items-center justify-content-center justify-content-sm-start  '>
          <label className='footer-right'>© 2023 Kilo Studios. All right reserved </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Footer;
