import React, { Component } from "react";
import ArtResults from "../ArtResults";

class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(event) {
    const element = event.target;
    const name = element.name;
    const value = element.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState)
  }

  onFormSubmit(event) {
    event.preventDefault();
    const search = {
      search: this.state.search,
    }
      this.setState({
          submitted: true,
          search: search
        })
      }

  render() {
    if (this.state.submitted === true) {
    return (
      <div>
        <ArtResults key={this.state.submitted}
        query={this.state.search}/>
      </div>)
    } else{
    return (
      <div className="SearchBar">
          <form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
            <input type="text" name='search' placeholder="Search for Art"/>
            <button className="SearchButton" type="submit">Find</button>
          </form>
    </div>
    )}
  }
}

export default Search;
