import React, { Component } from "react";
import "./style.css";


class LandingPage extends Component {
  constructor(props){
    super(props);
      this.state = {
        myData: []
      };
  }

  // componentDidMount() {
  //   console.log(myData);
    
  //     myData => {
  //       this.setState({
  //         links: link
  //       });
  //     };
  // }

  render() {
    return (
    <div className="LandingPage">
    <h3>You have landed.</h3>
    {/* <p>{myData}</p> */}
    </div>
    );
  }
}

export default LandingPage;
