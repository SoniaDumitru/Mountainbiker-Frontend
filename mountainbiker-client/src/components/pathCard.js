import React, { Component } from 'react'
import { Divider, Image, Icon } from 'semantic-ui-react'
import style from '../styles/paths.css'

export default class PathCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      adventures: []
    }
  }

  addAdventure =(path)=> {
    this.setState({
      adventures: [...this.state.adventures, path]
    })
  }

  handleClick =(event)=> {
    if (this.props.currentUser) {
      event.preventDefault()
      fetch('http://localhost:3000/api/v1/adventures', {
        method: 'POST', mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
           "Access-Control-Allow-Origin" :"http://localhost:3000"
        },
        body:JSON.stringify({
          user_id: this.props.currentUser.id,
          path_id: this.props.path.id,
          name: this.props.path.name,
          location: this.props.path.location,
          image: this.props.path.imgMedium,
          summary: this.props.path.summary,
          length: this.props.path.length
        })
      })
        .then(res => res.json())
        .then(path => this.addAdventure(path))
        .catch(error => console.error(error))
    }
  }


  render() {
    const levelOfDifficulty = () => {
      let score=''
      if (path.difficulty === "blue") {
        score = "Intermediate"
      } else if (path.difficulty === "greenBlue") {
        score = "Easy/Intermediate"
      } else if (path.difficulty === "blueBlack") {
        score = "Intermediate/Hard"
      } else if (path.difficulty === "black") {
        score = "Hard"
      } else if (path.difficulty === "green") {
        score = "Easy"
      } else {
        score = "N/A"
      }
      return score;
    }

    const path = this.props.path
    const showImage = !!path.imgMedium ? path.imgMedium : process.env.PUBLIC_URL + 'https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?2214404492633272863';

    return(
         <div className="path-card">
         { this.props.currentUser ? <button className="adventure-button" onClick={ this.handleClick } ><Icon name='heart' /></button> : null }
           <img className="path-card-image" src= { showImage } />
            <div className="path-card-info">
             <div className='path-card-title'>{  path.name }</div>
               <div className='path-card-location'>{ path.location }</div>
               <div className='path-card-difficulty'>Difficulty: { levelOfDifficulty() }</div>
             <div className='path-card-rating'>Rating: { path.stars }</div>
           </div>
         </div>
       )
     }
   }
