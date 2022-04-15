import React from 'react';

export default function Navbar(props) {
  return (
      <header>
        <nav className="navbar navbar-expand-lg green-bg navbar-light bg-light p-0">
          <div className="container-fluid green-bg p-1 d-flex justify-content-center">
            <a className="navbar-brand text-white fs-4">Paws N Pals</a>
            <a href='#'>
              <img className='home-button' src='./images/home-icon.svg'/>
            </a>
          </div>
        </nav>
      </header>
  );
}
