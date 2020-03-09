import React, { Component } from 'react'
import { Input, Icon,TextArea, Grid, Button, Dimmer, Header, Image, Segment, Form, Divider} from 'semantic-ui-react'
import style from '../styles/style.css'
import MapContainer from './mapcontainer.js'

class Path extends Component {

  constructor(props) {
    super(props)
    this.state = {
      path: [],
      showTextArea: true,
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
    else { difficulty = "Difficulty Unknown"}
    return difficulty
  }

  handleClick = () => {this.setState({showTextArea: !this.state.showTextArea})}
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  componentDidMount() {
    fetch('https://mountainbiker.herokuapp.com/api/v1/paths/')
      .then(response => response.json())
      .then(paths => this.setState({
        path: paths.trails.find(trail => trail.id == this.props.location.pathname.split('/')[2])
      }));

    fetch('https://mountainbiker.herokuapp.com/api/v1/comments/')
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
      fetch('https://mountainbiker.herokuapp.com/api/v1/comments', {
        method: 'POST', mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
           "Access-Control-Allow-Origin" :"https://mountainbiker.herokuapp.com"
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

    const displayStars = () => {
      let stars = ''
      if (this.state.path.stars === 5) {
        stars = '★★★★★'
      } else if (this.state.path.stars >= 4 && this.state.path.stars < 5) {
        stars = '★★★★☆'
      } else if (this.state.path.stars >= 3 && this.state.path.stars < 4) {
        stars = '★★★☆☆'
      } else if (this.state.path.stars >= 2 && this.state.path.stars < 3) {
        stars = '★★☆☆☆'
      } else if (this.state.path.stars >= 1 && this.state.path.stars < 2) {
        stars = '★☆☆☆☆'
      } else {
        stars = "no rating yet"
      }
      return stars;
    }

    return (
          <div>
            <div className="path-page-header">{ this.state.path.name }</div>

              <Grid columns={10}>
                <Grid.Column>
                  <div className="difficulty"><span style={{color: 'white'}}>{this.levelOfDifficulty() }</span><br></br></div>
                </Grid.Column>

                <Grid.Column>
                  <div className="rating"><span style={{color: 'red'}}>{displayStars()} ({this.state.path.starVotes})</span><br></br></div>
                </Grid.Column>
              </Grid>

              <div>
                <Segment placeholder >
                    <Grid columns={3} stackable>
                      <Grid.Row verticalAlign='middle'>
                          <Grid.Column>
                            <img
                              className="path-image"
                              dimmed={active}
                              dimmer={{ active, content }}
                              onMouseEnter={this.handleShow}
                              onMouseLeave={this.handleHide}
                              size="huge"
                              src={ this.state.path.imgMedium}>
                             </img>
                          </Grid.Column>

                          <div>
                            {this.state.path.length > 0 ?
                               <div><MapContainer path={this.state.path} /></div> : null }
                          </div>

                          <Grid.Column>
                            <div>
                              <p className="path-page-sub-header">{this.state.path.location}</p>
                              <div style={{fontStyle: 'italic'}}><strong>"{ this.state.path.summary }."</strong><br></br></div>
                            </div>
                          </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Segment>
                <Segment>
                  <Grid columns={3} stackable textAlign='left'>
                    <Grid.Row verticalAlign='middle'>
                      <Grid.Column>
                        <div className="details"><strong>🚲 Trail</strong></div>
                        <div className="details"><strong>{this.state.path.length}</strong> miles loop</div>
                        <div className="details">90% Singletrack</div>
                        <div className="details">{ this.levelOfDifficulty() } ℹ️</div>
                        <div className="details">🐶Dogs Leashed</div>
                      </Grid.Column>

                      <Grid.Column>
                        <div className="details"><strong>📏 Elevation</strong></div>
                        <div className="details">Ascent:<strong> { this.state.path.ascent }'</strong></div>
                        <div className="details">Descent:<strong> { this.state.path.descent }'</strong></div>
                        <div className="details">High:<strong> { this.state.path.high }'</strong></div>
                        <div className="details">Low:<strong> { this.state.path.low }'</strong></div>
                      </Grid.Column>

                      <Grid.Column>
                        <div className="details"><strong> ☁️ Current Trail </strong></div>
                        <div className="details">Status: <strong>{ this.state.path.conditionStatus } </strong></div>
                        <div className="details"> Condition: <strong>{ this.state.path.conditionDetails === null ? 'Unknown' : this.state.path.conditionDetails } </strong></div>
                        <div className="details"> Condition Date: <strong>{ this.date(this.state.path.conditionDate) } </strong></div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <div>
                  </div><>
                    <Segment style={{marginTop: '10px', background: '#F8F8F8'}} padded>
                      <form
                          className="comment-form"
                          onSubmit={this.handleSubmit}><br></br>
                        <Input
                          size='huge'
                          onChange={this.handleChange}
                          value={this.state.content}
                          placeholder='Write a comment...'
                          labelPosition='left'/>
                        <button  className="post-button" onSubmit={this.handleSubmit}>Post</button>
                      </form>
                        {this.state.comments.map(comment =>
                          <Grid columns={3} stackable textAlign='left'>
                            <Grid.Column>
                              <div
                                style={{marginTop: '15px'}}
                                very padded>From <strong>
                                {this.date(comment.created_at)}: </strong> {comment.content}
                              </div>
                            </Grid.Column>
                          </Grid>) }
                    </Segment><br></br></><br></br>
              </div>
          </div>
        )
    }
  }

 export default Path
