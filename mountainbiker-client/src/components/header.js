import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { Navbar} from 'react-bootstrap'
import User from './user.js'

export default class Header extends Component {

  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return(
      <Segment inverted vertical>
        <Menu inverted pointing secondary>
          <Navbar.Collapse className="welcome" collapseOnSelect>
            <Link to="/home" className="item">Home</Link>
          </Navbar.Collapse>

          <Navbar.Collapse className="welcome">
            <Link to="/paths" className="item">MTB Trails</Link>
          </Navbar.Collapse>

          { !this.props.currentUser ?
          <Menu.Menu position="right">
            <Navbar.Collapse className="welcome">
              <Link to="/signup" className="item">Sign Up</Link>
            </Navbar.Collapse>

            <Navbar.Collapse className="welcome">
              <Link to="/login" className="item">Log In</Link>
            </Navbar.Collapse>
          </Menu.Menu>
             :
          <Menu.Menu position="right">
            <Navbar.Collapse className="welcome">
              <Menu.Item>{`Hi, ${this.props.currentUser.name}!`}</Menu.Item>
            </Navbar.Collapse>

            <Navbar.Collapse className="welcome">
              <Menu.Item onClick={this.props.logout}>Log out</Menu.Item>
            </Navbar.Collapse>
         </Menu.Menu>}

         { !this.props.currentUser ? null :
           <Navbar.Collapse className="welcome">
            <Link to="/profile" className="item">My Profile</Link>
          </Navbar.Collapse> }
        </Menu>
      </Segment>
    )
  }
}
