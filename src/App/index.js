import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "./style.css";
// import Search from "../Search";
import TestArtsPage from "../TestArtsPage";


class App extends Component {

  render() {

    return (
        <div className="App">
        <header>
        <a href= "/" className="Logo" style={{textDecoration:'none'}} > Savvy Sapian</a>
        <h2 style={{color:'white'}}>Art at your fingertips.</h2>
        </header>
        <div className="appBody">
        <Router>
        {/* <Search /> */}
        <TestArtsPage />
        {/* <Route path="/" exact component={TestArtsPage}/> */}
        </Router>
        </div>
        <footer>
          <a href='https://www.jesababon.com' style={{textDecoration:'none'}}>© Jes Ababon</a>
        </footer>
        </div>
    );
  }
}


export default App;
