import React, { Component } from 'react'
import { Input, Icon,TextArea, Grid, Button, Dimmer, Header, Image, Segment, Form } from 'semantic-ui-react'
import style from '../styles/paths.css'
import MapContainer from './mapcontainer.js'

class Path extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: [],
      showTextArea: false,
      content: '',
      comments: []
    }
  }

  levelOfDifficulty = () => {
    let difficulty = ''
    if (this.state.path.difficulty === 'blue') { difficulty = "Intermediate" }
    else if (this.state.path.difficulty === 'greenBlue') { difficulty = "Easy/Intermediate" }
    else if (this.state.path.difficulty === 'blueBlack') { difficulty = "Intermediate/Hard"}
    else if (this.state.path.difficulty === 'black') { difficulty = "Hard" }
    else if (this.state.path.difficulty === 'green') { difficulty = "Easy" }
    else { difficulty = "N/A"}
    return difficulty
  }

  handleClick = () => {this.setState({showTextArea: !this.state.showTextArea})}
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/paths/')
      .then(response => response.json())
      .then(paths => this.setState({
        path: paths.trails.find(trail => trail.id == this.props.location.pathname.split('/')[2])
      }));

    fetch('http://localhost:3000/api/v1/comments/')
      .then(response => response.json())
      .then(comments => this.setState({
        comments: comments.filter(comm => comm.path_id == this.props.location.pathname.split('/')[2])
      }) )
  }

  addComment =(comment)=> {
    this.setState({
      comments: [...this.state.comments, comment]
    })
  }

  handleSubmit =(event)=> {
    // if (this.props.currentUser) {
      event.preventDefault()
      fetch('http://localhost:3000/api/v1/comments', {
        method: 'POST', mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
           "Access-Control-Allow-Origin" :"http://localhost:3000"
        },
        body:JSON.stringify({
          content: this.state.content,
          path_id: this.state.path.id,
          // user_id: this.props.currentUser.id
        })
      })
        .then(res => res.json())
        .then(res => this.addComment(res))
        .then(this.setState({
          content: ''
        }))
        .catch(error => console.error(error))
    // }
  }

  handleChange =(event)=> {
    this.setState({
      content: event.target.value
    })
  }

  date = (date) => {
    let newDate = new Date(date)
    let allMonths = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"]
    return newDate.getDate() + ' ' + allMonths[newDate.getMonth()] + ' ' + newDate.getFullYear()
  }

  render() {

    const { active } = this.state
    const content = (
      <div>
        <Header as='h2' inverted > View public comments & post your opinion!</Header>
        <Button onClick={this.handleClick} size='huge' color='black'>👍</Button>
      </div>
    )

    return (
          <div className="path-container">
            <h3 className="path-page-header">{ this.state.path.name }</h3>
              <p className="path-page-sub-header">{this.state.path.location}</p>
                <div className="path-card-container">
                  <div className="details" > Description: <strong>{ this.state.path.summary }</strong></div>
                    <div className="details">Difficulty: <strong>{this.levelOfDifficulty()}</strong> | Rating: <strong>🚲 {this.state.path.stars}</strong> | Length: <strong>{this.state.path.length}</strong> miles</div>
                      {this.state.showTextArea ? <>
                        <Form onSubmit={this.handleSubmit}><br></br>
                          <Input size='large' onChange={this.handleChange} value={this.state.content} placeholder='Tell us more...' label={{ basic: true, content: '👍' }} labelPosition='left'/>
                          </Form><br></br>
                            <Segment style={{marginTop: '15px'}} padded>{this.state.comments.map(comment =>
                              <Segment style={{marginTop: '15px'}}  very padded>From <strong>{this.date(comment.created_at)}: </strong> {comment.content}</Segment>
                              )}
                            </Segment><br></br></>
                             : null }<br></br>
                             <Dimmer.Dimmable
                             className="path-image"
                             as={Image}
                             rounded
                             dimmed={active}
                             dimmer={{ active, content }}
                             onMouseEnter={this.handleShow}
                             onMouseLeave={this.handleHide}
                             size="huge"
                             src={ this.state.path.imgMedium}/><div><br></br>
                             <div>
                             {this.state.path.length > 0 ? <MapContainer path={this.state.path} /> : null }
                             </div>

                             <div className="path-infocard-container">
                             <div className="path-info-card">

                            <br></br>
                          </div>
                        </div><br></br>
                      </div>
                    </div>
                </div>
              )
          }
    }

 export default Path
