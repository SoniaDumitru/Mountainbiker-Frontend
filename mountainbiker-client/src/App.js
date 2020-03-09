import React, { Component } from 'react';
import Main from './containers/mainContainer'
import PathList from './containers/pathList'
import Login from './components/login'
import Signup from './components/signup'
import User from './components/user.js'
import Header from './components/header.js'
import Path from './components/path.js'
import HomePage from './components/homePage.js'
import logo from './logo.svg'
import './styles/style.css'
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom"
import { Menu } from 'semantic-ui-react'
import UpdateUser from './components/updateUser'

class App extends Component {
constructor() {
  super()
  this.state = {
    currentUser: '',
    user: null,
    adventures: []
    }
  }

  componentDidMount(){
		let token = localStorage.getItem("token")
		if(token){
			fetch(`https://mountainbiker.herokuapp.com/api/v1/current_user`, {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then((response) => {
				this.setState({
					currentUser: response
				})
			})
		}
	}

  signup = ({image, email, location, name, password, passwordConfirmation}) => {
    if (password === passwordConfirmation) {
      fetch('https://mountainbiker.herokuapp.com/api/v1/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          image: image,
          password: password,
          location: location,

        })
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
          localStorage.setItem("token", response.token)
          this.setState({
            currentUser: response.user
          })
            this.props.history.push('/profile')
        }
      })
    } else {
      alert("Passwords do not match")
    }
  }

  login =(email, password)=> {
    fetch('https://mountainbiker.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors) {
        alert(response.errors)
      } else {
        localStorage.setItem("token", response.token)
        this.setState({
          currentUser: response.user
        })
        this.props.history.push('/profile')
      }
    })
  }

  logout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem("token")
    this.props.history.push("/home")
  }

  render() {
    return (
        <div className="App">
          <Header currentUser={this.state.currentUser} logout={this.logout}/>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route path="/paths" render={(props) => <Main {...props} currentUser={this.state.currentUser}/>} />
              <Route exact path="/edit" render={(props) => <UpdateUser {...props} currentUser={this.state.currentUser} updateUser={this.updateUser} /> } />
              <Route exact path="/login" render={(props) => <Login login={this.login} {...props}/>} />
              <Route exact path="/signup" render={(props) => <Signup signup={this.signup} {...props}/>} />
              <Route exact path="/path/:id" render={(props) => <Path {...props} currentUser={this.state.currentUser} /> } />
              <Route exact path="/profile" render={(props) => <User currentUser={this.state.currentUser} logout={this.logout} {...props}/> } />
            </Switch>
        </div>
    );
  }
}

export default withRouter(App)
