import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
require('dotenv').config()
import "./style.css";
import Search from "../Search";
// import TestArtsPage from "../TestArtsPage";


class App extends Component {

  render() {

    return (
        <div className="App">
        <nav>
        <a href= "/" className="Logo" style={{textDecoration:'none'}} > Savvy Sapian</a>
        </nav>
        <Router>
        <Search />
        {/* <Route path="/" exact component={TestArtsPage}/> */}
        </Router>
        </div>
    );
  }
}


export default App;
