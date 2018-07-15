import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./style.css";
import LandingPage from "../LandingPage";
// import TestArtsPage from "../TestArtsPage";


class App extends Component {

  render() {

    return (
        <div className="App">
        <nav>
        <a href= "/" className="Logo" style={{textDecoration:'none'}} > Savvy Sapian</a>
        </nav>
        <Router>
        <Route path="/" exact component={LandingPage}/>
        {/* <Route path="/" exact component={TestArtsPage}/> */}
        </Router>
        </div>
    );
  }
}


export default App;
