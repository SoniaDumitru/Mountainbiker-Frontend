import React, { Component } from 'react'
import { Divider, Image, Icon } from 'semantic-ui-react'
import style from '../styles/style.css'

class PathCard extends Component {

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

  handleClick =(event, adventure)=> {
    if (this.props.currentUser) {
      event.preventDefault()
      fetch('https://mountainbiker.herokuapp.com/api/v1/adventures/', {
        method: 'POST', mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin" :"https://mountainbiker.herokuapp.com"
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
// this.contains(this.state.adventures, path) ? null :
//   contains=(path, obj)=> {
//       for (var i = 0; i < path.length; i++) {
//           if (path[i] === obj) {
//               return true;
//           }
//       }
//       return false;
//     }

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

    const displayStars = () => {
      let stars = ''
      if (path.stars === 5) {
        stars = '★★★★★'
      } else if (path.stars >= 4 && path.stars < 5) {
        stars = '★★★★☆'
      } else if (path.stars >= 3 && path.stars < 4) {
        stars = '★★★☆☆'
      } else if (path.stars >= 2 && path.stars < 3) {
        stars = '★★☆☆☆'
      } else if (path.stars >= 1 && path.stars < 2) {
        stars = '★☆☆☆☆'
      } else {
        stars = "no rating yet"
      }
      return stars;
    }

    const path = this.props.path
    const showImage = !!path.imgMedium ? path.imgMedium : process.env.PUBLIC_URL + 'https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?2214404492633272863';

    return(
         <div className="path-card">
         { this.props.currentUser ?
           <button
             className="adventure-button"
             onClick={ this.handleClick }>
             <Icon>❤️</Icon>
           </button> : null }

           <img className="path-card-image" src= { showImage } />
            <div className="path-card-info">
              <div className='path-card-title'>{ path.name }</div>
              <div className='path-card-location'>{ path.location }</div>
              <div className='path-card-difficulty'>Difficulty: { levelOfDifficulty() } </div>
              <div className='path-card-rating'>Rating: { displayStars() }</div>
            </div>
         </div>
       )
     }
   }
export default PathCard
