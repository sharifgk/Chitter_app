import React from "react";
import { NavLink } from 'react-router-dom';

const Navigation = ({loggedIn, onLogout}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Chitter 🦜</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                     <ul className="navbar-nav ml-auto">
                        {!loggedIn && (<>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
              </>)}
                        {loggedIn && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={onLogout}>Log out</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    );
};


export default Navigation;