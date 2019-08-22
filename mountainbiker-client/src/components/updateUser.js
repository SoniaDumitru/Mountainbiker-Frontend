import React, { Component } from 'react'
import style from '../styles/paths.css'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { NavLink } from "react-router-dom"

export default class UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      name: this.props.currentUser.name,
      image: this.props.currentUser.image,
      location: this.props.currentUser.location,
      email: this.props.currentUser.email
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm = (userId) => {
    let id = userId
    // event.preventDefault();
    id = `${this.props.currentUser.id}`
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH", mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        image: this.state.image,
        email: this.state.email,
        location: this.state.location
      })
    })
    .then(resp => resp.json())
    .then(resp => this.setState({
      currentUser: resp
    }))
    this.props.history.push('/profile')
  }

  render() {
    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
           <Grid.Column style={{ maxWidth: 450 }}>
             <Header as='h2' color='black' textAlign='center'>
               <Image src='https://res.cloudinary.com/teepublic/image/private/s--wo61j7NC--/t_Preview/b_rgb:ffffff,c_lpad,f_jpg,h_630,q_90,w_1200/v1514386954/production/designs/2225855_1.jpg' /> Update your account
                 </Header>
                   <Form size='large' onSubmit={() => this.submitForm(this.state.currentUser.id)} >
                     <Segment stacked>
                       <Form.Input
                         value={this.state.name}
                         name='name'
                         onChange={this.handleChange}
                         fluid icon='user'
                         iconPosition='left'
                         placeholder='Name' />

                       <Form.Input
                         name='image'
                         value={this.state.image}
                         onChange={this.handleChange}
                         fluid
                         icon='user'
                         iconPosition='left'
                         placeholder='Image URL'/>

                       <Form.Input
                         name='email'
                         value={this.state.email}
                         onChange={this.handleChange}
                         fluid icon='user'
                         iconPosition='left'
                         placeholder='E-mail address' />

                       <Form.Input
                         name='location'
                         onChange={this.handleChange}
                         value={this.state.location}
                         fluid
                         icon='user'
                         iconPosition='left'
                         placeholder='Location'/>

                      <Button type="submit"
                      color='black'
                      fluid size='large'>
                      Update Account
                     </Button>
                 </Segment>
               </Form>
          </Grid.Column>
      </Grid>
    )
  }
}
