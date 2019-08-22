import React, { Component } from 'react'
import style from '../styles/paths.css'
import { Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class HomePage extends Component {

  handleClick = () => this.buttonRef.current.focus()

  render() {
    return  (
      <>
        <div className='home'>
          <div className='welcome-msg'>Welcome to Mountainbiker</div><br></br>
          <NavLink
            to="/paths"
            exact>
            <Button
            size='huge'
            inverted
            color='black'
            content='Set focused' >Explore</Button>
          </NavLink>
        </div>
      </>
    )
  }
}
