import React, { Component } from 'react'
import HomePage from '../components/homePage.js'
import { Button } from 'semantic-ui-react'
import PathList from './pathList.js'
import SearchPaths from '../components/searchPaths.js'
import Path from '../components/path.js'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      paths: [],
      search: '',
      clicked_path: ''
    }
    this.server = 'http://localhost:3000/api/v1/'
  }

  componentDidMount() {
    let url = this.server + "paths/"
    fetch(url)
    .then(resp => resp.json())
    .then(paths => this.setState({
      paths: paths.trails
    }));
  }

  // addPathsToState = (paths) => {
  //   this.setState({
  //     paths: paths
  //   })
  // }

  filteredPaths = () => {
    let filteredPaths = this.state.paths.filter(path=>{
      if (path.name.toLowerCase().includes(this.state.search.toLowerCase())) { return true }
      else if (path.location.toLowerCase().includes(this.state.search.toLowerCase())) { return true }
      else if (path.difficulty.toLowerCase().includes(this.state.search.toLowerCase())) { return true }
    })
    return filteredPaths
  }

  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  getId =(path)=> {
    this.setState({
      clicked_path: this.state.path
    })
  }

  render() {
    return(
      <div>

        <SearchPaths
        search={this.state.search}
        handleSearchChange={this.handleSearchChange}/>

        <PathList
        getId={this.getId}
        paths={this.filteredPaths()}
        currentUser={this.props.currentUser}/>

      </div>
    )
  }
}
