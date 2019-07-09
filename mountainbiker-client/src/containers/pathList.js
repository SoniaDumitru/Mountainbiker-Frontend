import React, { Component } from 'react'
import PathCard from '../components/pathCard.js'
import Path from '../components/path.js'
import { NavLink } from 'react-router-dom'
import style from '../styles/paths.css'

export default class PathList extends Component {
  render() {

      return(
        <div className="paths-list">
        {this.props.paths.map(path =>
          <NavLink to={`/path/${path.id }`}>
          <PathCard
            path={path}
            currentUser={this.props.currentUser}/>
          </NavLink>)}
        </div>
      )
    }
  }
