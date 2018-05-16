import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term: '',
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({
      term: event.target.value,
    });
  }

  handleKeyPress(event){
    if (event.key === "Enter"){
      this.props.onSearch(this.state.term);
    }
  }

  render() {
    return(
      <div className="searchBar">
        <div className="searchBar-field">
          <input onChange={this.handleTermChange} onKeyDown={this.handleKeyPress} placeholder="Enter Artist, Album, or Song" />
          <a onClick={this.search}>Search</a>
        </div>
        <div className="submit">
          <a onClick={this.props.onSave}>Submit Playlist <i className="fab fa-spotify"></i></a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
