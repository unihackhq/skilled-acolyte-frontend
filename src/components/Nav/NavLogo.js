import React from 'react';
import { Link } from 'react-router-dom';
import { reaction } from 'mobx';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownContent, DropdownItem, Button } from 'bloomer';
import ArrowDropdownIcon from '@material-ui/icons/ArrowDropDown';
import './NavLogo.scss';

class NavLogo extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
    events: MobxPropTypes.observableObject.isRequired,
  }

  state = {
    open: false,
  }

  componentDidMount() {
    const { user, events } = this.props;

    // fetch list when user logged in
    reaction(
      () => user.loggedIn,
      (loggedIn) => {
        if (loggedIn) {
          events.fetchList();
        }
      },
      { fireImmediately: true },
    );
  }

  toggleDropdown = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleChange = (id) => {
    const { events } = this.props;
    events.changeSelected(id);
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { events } = this.props;

    if (!events.selectedId) {
      return (
        <React.Fragment>
          <Link to="/">
            <img src="/img/logo-melb.png" alt="Logo" className="navbar-logo__img" />
          </Link>
          <span className="is-size-4 navbar-logo__title">
            UNIHACK
          </span>
        </React.Fragment>
      );
    }

    const { logoUrl, name } = events.selected;
    return (
      <React.Fragment>
        <Link to="/">
          <img src={logoUrl} alt="Logo" className="navbar-logo__img" />
        </Link>
        <Dropdown isActive={open} className="navbar-logo__dropdown">
          <DropdownTrigger onClick={this.toggleDropdown}>
            <Button aria-haspopup="true" aria-controls="dropdown-menu" className="is-size-4">
              {name}
              <ArrowDropdownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownContent>
              {events.list.map(event => (
                <DropdownItem
                  key={event.id}
                  tag="a"
                  onClick={() => this.handleChange(event.id)}
                >
                  {event.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default inject('user', 'events')(observer(NavLogo));
