import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import LandingPage from "../LandingPage";


class App extends Component {

  render() {

    return (
    <Router>
      <div className="App">
        <h1>Savvy?</h1>
        <nav>
        <Link to = "/"> Home </Link>
        </nav>
        <Route path="/" exact component={LandingPage}/>
      </div>
    </Router>
    );
  }
}


export default App;
