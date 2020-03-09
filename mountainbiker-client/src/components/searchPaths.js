import React, { Component } from 'react'
import style from '../styles/style.css'

class SearchPath extends Component {

  render() {
    return (
      <div className="search">
          <div className="ui big icon input">
            <input
              size="30"
              type="text"
              placeholder={"Search by name or location..."}
              onChange={event=> this.props.handleSearchChange(event)}
              value={this.props.search}/>
            <i className="circular search link icon"></i>
          </div>
      </div>
    )
  }
}

export default SearchPath
