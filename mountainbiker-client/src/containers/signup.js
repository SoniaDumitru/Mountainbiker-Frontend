import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

export default class Signup extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      image: '',
      location: '',
      passwordConfirmation: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm =()=> {
    this.props.signup({
      name: this.state.name,
      password: this.state.password,
      image: this.state.image,
      email: this.state.email,
      location: this.state.location})
  }


  render() {
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
         <Grid.Column style={{ maxWidth: 450 }}>
           <Header as='h2' color='black' textAlign='center'>
             <Image src='https://res.cloudinary.com/teepublic/image/private/s--wo61j7NC--/t_Preview/b_rgb:ffffff,c_lpad,f_jpg,h_630,q_90,w_1200/v1514386954/production/designs/2225855_1.jpg' /> Create your account
               </Header>
                 <Form size='large' onSubmit={this.submitForm}>
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

                     <Form.Input
                       name='password'
                       onChange={this.handleChange}
                       value={this.state.password}
                       fluid
                       icon='lock'
                       iconPosition='left'
                       placeholder='Password'
                       type='password'/>

                     <Form.Input
                       name='passwordConfirmation'
                       onChange={this.handleChange}
                       value={this.state.passwordConfirmation}
                       fluid
                       icon='lock'
                       iconPosition='left'
                       placeholder='Password Confirmation'
                       type='password'/>

                   <Button type="submit" color='black' fluid size='large'>
                     Create Account
                   </Button>
                 </Segment>
               </Form>

         </Grid.Column>
      </Grid>

    )
  }
}

// <Message>
// See Your Profile? <NavLink to='/:username' exact>Profile</NavLink>
// </Message>
