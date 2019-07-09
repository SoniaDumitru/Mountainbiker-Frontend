import React, { Component } from 'react'
import style from '../styles/paths.css'
import { Divider, Image, Segment } from 'semantic-ui-react'


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
    fetch('http://localhost:3000/api/v1/adventures/')
      .then(response => response.json())
      .then(adventures => this.setState({
        adventures: adventures.filter(adventure => adventure.user_id == this.props.currentUser.id)
      }));
  }

  deleteAdventures =(id)=> {
    fetch(`http://localhost:3000/api/v1/adventures/${id}`, {
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

  render() {
    let currentUser = this.props.currentUser
    // let brokenImg = "../logo.svg";
    return(
      <div style={{marginTop: '60px', marginBottom: '25px'}}>
        <Image rounded size="medium" className="ui medium centered image" src={  currentUser.image  } /><br></br>
          <div className="username">{currentUser.name}</div><br></br>
            <div><i>🏠 <strong>{currentUser.location}</strong></i></div><br></br>
              <div ><i><strong>Member since: {this.date(currentUser.created_at)}</strong></i></div><br></br>
                {this.state.adventures.length > 0 ? <div className="username"> My Adventures </div> : null}

                  {this.state.adventures.map(adventure =>
                    <div onClick={() => this.deleteAdventures(adventure.id)} className="path-card-user">
                      <img className="path-card-image-user" src={adventure.image}/>
                        <div className="path-card-info-user">
                          <div className='path-card-details-user'>{adventure.name}</div>
                            <div className='path-card-details-user' >{adventure.location}</div>
                            <div className='path-card-details-user' >{adventure.length} miles</div>
                          <div  className='path-card-details-user' >{adventure.summary}</div>
                        </div>
                      </div>)}
                    </div>
            )
      }
  }
