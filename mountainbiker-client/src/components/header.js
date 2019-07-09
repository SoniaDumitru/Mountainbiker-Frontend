import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Menu, Button, Segment } from 'semantic-ui-react'
import User from './user.js'

export default class Header extends Component {

  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return(
      <Segment inverted vertical >

      <Menu inverted pointing secondary>

       <Link to="/home" className="item">Home</Link>
       <Link to="/paths" className="item">Paths</Link>
       { !this.props.currentUser ?
          <Menu.Menu position="right">
            <Link to="/signup" className="item">Sign Up</Link>
            <Link to="/login" className="item">Log In</Link>
           </Menu.Menu>
             :
             <Menu.Menu position="right">

             <Menu.Item>
              {`Welcome, ${this.props.currentUser.name}!`}
            </Menu.Item>

            <Menu.Item onClick={this.props.logout}>
              Log out
           </Menu.Item>


         </Menu.Menu>
       }

       { !this.props.currentUser ? null :
       <Link to="/profile" className="item">
         My Profile
       </Link>
     }
     </Menu>
     </Segment>
    )
  }
}
// <Link to="/:username" className="item">{<User currentUser={this.props.currentUser}/>}
//   My Profile
// </Link>
