import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'
import { selectors as userSelectors } from '../ducks/user'
import { Container, Menu } from 'semantic-ui-react'

class AppHead extends React.Component {
  constructor(props) {
    super(props);
    const { menuKey } = props;
    this.state = { activeItem: menuKey };
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })

    let route
    switch(name) {
      case 'home':
        route = ''
        break

      default:
        route = name
    }
    Router.push(`/${route}`)
  }

  render () {
    const { activeItem } = this.state
    const { title, loggedIn } = this.props
    return (
      <Container>
        <Head>
          <title>UNIHACK - {title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
        </Head>

        <Menu>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
          { loggedIn ? [
            <Menu.Item
              key='team'
              name='team'
              active={activeItem === 'team'}
              onClick={this.handleItemClick}
            >
              My team
            </Menu.Item>
          ] : [
            <Menu.Item
              key='register'
              name='register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
            >
              Register
            </Menu.Item>,
            <Menu.Item
              key='login'
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              Login
            </Menu.Item>
          ] }
        </Menu>
      </Container>
    )
  }
}

const mapState = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
})

export default connect(
  mapState
)(AppHead)
