import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    const { user, handleLogOut } = this.context;

    return (
      <header className='green-bg d-flex'>
        <i className="fa-solid fa-bars text-white fs-2 pt-3 ps-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            { user !== null &&
              <h2 className="offcanvas-title" id="offcanvasExampleLabel">Hello, {user.username}!</h2>
            }
            { user === null &&
              <h2 className="offcanvas-title" id="offcanvasExampleLabel">Paws N Pals!</h2>
            }
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body" data-bs-toggle="offcanvas">
            <div className="nav-links">
              <a href='#' className='tab-color hover text-black text-decoration-none d-flex p-2'>
                <i className="fa-solid fa-house-chimney fs-2 pe-4"></i>
                <h3>Home</h3>
              </a>
              <a href='#saved-matches' className='tab-color hover text-black text-decoration-none d-flex p-2'>
                <i className='fa-solid fa-paw fs-2 pe-4'></i>
                <h3>Matches</h3>
              </a>
              {user !== null &&
              <>
                <div className="d-grid mt-27">
                  <button className="btn btn-outline-dark"
                          type="button"
                          onClick={handleLogOut}>
                    <i className='fa-solid fa-right-to-bracket fs-2'></i>

                    <h3>Log Out</h3>
                  </button>
                </div>
              </>
              }
              { user === null &&
                <>
                  <a href='#sign-up' className='tab-color hover text-black text-decoration-none d-flex p-2'>
                    <i className='fa-solid fa-user-plus fs-2 pe-3'></i>
                    <h3>Sign Up</h3>
                  </a>
                  <a href='#log-in' className='tab-color hover text-black text-decoration-none d-flex p-2'>
                    <i className='fa-solid fa-right-to-bracket fs-2 pe-4'></i>
                    <h3>Log In</h3>
                  </a>
                </>
              }
            </div>
          </div>
        </div>
        <div className="container-fluid p-1 d-flex justify-content-center">
          <a className="navbar-brand text-white fs-4">Paws N Pals</a>
          <a href='#'>
            <img className='home-button hover' src='./images/home-icon.svg' />
          </a>
        </div>
      </header>
    );
  }
}

Navbar.contextType = AppContext;
