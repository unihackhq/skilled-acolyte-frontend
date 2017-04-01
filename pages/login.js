import React, { Component } from 'react'
import { connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { actions as userActions, selectors as userSelectors } from '../ducks/user'
import { Container } from 'semantic-ui-react'
import Head from '../components/head'
import LoginForm from '../components/loginForm'

class Login extends Component {
  login = (event) => {
    event.preventDefault()

    // dummy action to change state
    const dummyDetails = {
      name: 'Erfan Norozi',
      email: 'i@erfan.io'
    } // I am the dummy

    this.props.dispatch(userActions.login(dummyDetails))
  }

  render() {
    return (
      <Container text>
        <Head title='Login' menuKey='login'></Head>
        {/* show login form if not logged in */}
        { !this.props.loggedIn ? (
          <LoginForm onSubmit={this.login} />
        ) : (
          <div>LOGGED IN!</div>
        ) }
      </Container>
    )
  }
}

const propsMap = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
})

// a bit weird cause next...
// pass the component to connect to connect to the store
// then pass the connected component to withRedux to create/use the store
export default withRedux(initStore)(
  connect(propsMap)(Login)
)
