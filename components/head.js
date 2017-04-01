import Head from 'next/head'
import { Container, Menu } from 'semantic-ui-react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { menuKey } = props;
    this.state = { activeItem: menuKey };
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }) {
    console.log(name)
    this.setState({ activeItem: name })
  }

  render () {
    console.log('render')
    const { activeItem } = this.state
    const { title } = this.props
    return (<Container>
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

        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={this.handleItemClick}
        >
          Register
        </Menu.Item>

        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        >
          Login
        </Menu.Item>
      </Menu>
    </Container>
    )
  }

}