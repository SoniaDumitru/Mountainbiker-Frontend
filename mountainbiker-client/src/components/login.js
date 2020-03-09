import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm = () => {
   this.props.login(this.state.email, this.state.password)
 }

  render() {
    return(
      <Grid textAlign='center' className = 'signup-login' verticalAlign='middle'>
         <Grid.Column style={{ maxWidth: 450 }}>
           <Header as='h2' color='black'>
             <Image src='https://res.cloudinary.com/teepublic/image/private/s--wo61j7NC--/t_Preview/b_rgb:ffffff,c_lpad,f_jpg,h_630,q_90,w_1200/v1514386954/production/designs/2225855_1.jpg' />
                Log-in to your account
               </Header>
                 <Form size='large' onSubmit={this.submitForm}>
                   <Segment stacked>
                     <Form.Input
                        onChange={this.handleChange}
                        name='email'
                        fluid icon='user'
                        iconPosition='left'
                        placeholder='E-mail' />
                     <Form.Input
                         onChange={this.handleChange}
                         name="password"
                         fluid
                         icon='lock'
                         iconPosition='left'
                         placeholder='Password'
                         type='password'/>
                     <Button type="submit" color='black' fluid size='large'>
                       Login
                   </Button>
                </Segment>
              </Form>
         </Grid.Column>
      </Grid>

    )
  }
}
