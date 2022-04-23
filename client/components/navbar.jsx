import React from 'react';

export default function Navbar(props) {
  return (
      <header className='green-bg d-flex'>
      <i className="fa-solid fa-bars text-white fs-2 pt-3 ps-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h2 className="offcanvas-title" id="offcanvasExampleLabel">Paws N Pals</h2>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="nav-links">
              <a href='#' className='tab-color hover text-black text-decoration-none d-flex p-2'>
                <i className="fa-solid fa-house-chimney fs-2 pe-4"></i>
                <h3>Home</h3>
              </a>
            <a href='#saved-matches' className='tab-color hover text-black text-decoration-none d-flex p-2'>
              <i className='fa-solid fa-paw fs-2 pe-4'></i>
                <h3>Matches</h3>
              </a>
            </div>
          </div>
        </div>
        <div className="container-fluid p-1 d-flex justify-content-center">
          <a className="navbar-brand text-white fs-4">Paws N Pals</a>
          <a href='#'>
            <img className='home-button hover' src='./images/home-icon.svg'/>
          </a>
        </div>
      </header>
  );
}
