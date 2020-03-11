import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import paths from '../styles/style.css'
import { Input, Icon,TextArea, Grid, Button, Dimmer, Header, Image, Segment, Form, Divider} from 'semantic-ui-react'


export default class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
        adventures: []
      }
  }

  date = (date) => {
    let newDate = new Date(date)
    let allMonths = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"]
    return newDate.getDate() + ' ' + allMonths[newDate.getMonth()] + ' ' + newDate.getFullYear()
  }

  componentDidMount() {
    fetch('https://mountainbiker.herokuapp.com/api/v1/adventures/')
      .then(response => response.json())
      .then(adventures => this.setState({
        adventures: adventures.filter(adventure => adventure.user_id == this.props.currentUser.id)
      }));
  }

  deleteAdventures =(id)=> {
    fetch(`https://mountainbiker.herokuapp.com/api/v1/adventures/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(resp => resp.json())
    .then(resp =>  this.setState({
      adventures: this.state.adventures.filter(a => a.id !== id)
    }))
  }

  deleteCurrentUser =(userId)=> {
     let id = userId
      id = `${this.props.currentUser.id}`
      console.log(id)
       fetch(`https://mountainbiker.herokuapp.com/api/v1/users/${id}`, {
         method: 'DELETE',
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
         },
         body: JSON.stringify({
           id: id
           })
         })
       .then(resp => resp.json())
       .then(data => this.props.logout(data))
      this.props.history.push('/login')
  }

  render() {
    let currentUser = this.props.currentUser
    return (
    <Grid columns={2}>
      <Segment style={{marginTop: '30px', marginBottom: '30px', width: '400px', marginLeft: '35px'}}>
          <Image
            rounded
            size="medium"
            className="ui medium centered image"
            src={currentUser.image}>
          </Image><br></br>

        <div className="username">{currentUser.name}</div><br></br>
        <div>🏠Location: <strong>{currentUser.location}</strong></div><br></br>
        <div>Member since: <strong>{this.date(currentUser.created_at)}</strong></div><br></br>

        <div>
          <Button
            marginBottom="20px"
            inverted color="red"
            onClick={() => this.deleteCurrentUser(currentUser.id)}>Delete Account
          </Button>
        </div><br></br>

        <div>
          <NavLink
            to='/edit'
            exact>
          <Button
            marginBottom="20px"
            inverted color="green">Update Account</Button>
          </NavLink>
        </div><br></br>
        </Segment>

        <Segment style={{marginTop: '30px', marginBottom: '30px', width: '1000px', background: '#F8F8F8'}}>
        {this.state.adventures.length > 0 ?
        <div style={{fontSize: '30px'}}>My Adventures </div> : null}<br></br>
            {this.state.adventures.map(adventure =>
                  <div className="path-card-user">
                      <img className="path-card-image" src={adventure.image}/>
                      <div className="path-card-info-user">
                      <div className='path-card-title-user'><strong>{adventure.name}</strong></div>
                      <div className='path-card-location-user' >{adventure.location}</div>
                      <div className='path-card-details-user' >{adventure.length} miles</div>
                      <div  className='path-card-details-user' >{adventure.summary}</div>
                      <button
                        className="adventure-button-delete"
                        onClick={() => this.deleteAdventures(adventure.id)}>
                        <Icon> 🗑️</Icon>
                      </button>
                  </div>
          </div>)}
          </Segment>
      </Grid>
      )
    }
}
