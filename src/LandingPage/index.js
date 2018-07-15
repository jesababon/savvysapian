import React, { Component } from "react";
import "./style.css";
import Search from '../Search';


class LandingPage extends Component {

  render() {
    return (
    <div className="LandingPage">
    <h3>You have landed.</h3>
    <Search />
    </div>
    );
  }
}

export default LandingPage;
