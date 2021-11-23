import React, { Component } from "react";
import farmer from "../bulldoge.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-white">
        <img
          src={farmer}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
          id="account"
        />
        &nbsp; BullDoge Hodler, Your accounts is {this.props.account}
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
