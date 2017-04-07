import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectors as userSelectors } from '../../ducks/user';
import { Container, Menu } from 'semantic-ui-react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    const { menuKey } = props;
    this.state = { activeItem: menuKey };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    let route;
    switch(name) {
      case 'home':
        route = '';
        break;

      default:
        route = name;
    }
    this.props.history.push(`/${route}`);
  }

  render () {
    const { activeItem } = this.state;
    const { title, loggedIn } = this.props;

    // update the page title
    if (typeof title === 'string' && document.title !== title) {
      document.title = title;
    }

    return (
      <Container>
        <Menu>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
          { loggedIn ? (
            <Menu.Item
              key="team"
              name="team"
              active={activeItem === 'team'}
              onClick={this.handleItemClick}
            >
              My team
            </Menu.Item>
          ) : (
            <Menu.Item
              key="login"
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              Login
            </Menu.Item>
          ) }
        </Menu>
      </Container>
    )
  }
}

const mapState = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
});

export default withRouter(connect(
  mapState
)(Nav));
