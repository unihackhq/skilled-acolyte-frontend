import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reaction } from 'mobx';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownContent, DropdownItem, Button } from 'bloomer';
import ArrowDropdownIcon from '@material-ui/icons/ArrowDropDown';
import './NavLogo.scss';

const LogoSvg = ({ color }) => (
  <svg alt="Logo" className="navbar-logo__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12140 16000" preserveAspectRatio="xMidYMid meet">
    <g stroke="none">
      <path fill={color} d="M3180 14672 c0 -720 3 -1404 7 -1520 l6 -212 4454 0 c2449 0 4453 3 4453 8 0 4 -12 25 -28 47 -23 35 -2599 2616 -2849 2856 -152 146 257 129 -3134 129 l-2909 0 0 -130 8z" />
      <path fill={color} d="M2990 15921 c-25 -16 -696 -681 -1491 -1477 -1382 -1384 -1448 -1452 -1470 -1509 l-24 -60 -3 -4440 c-1 -2945 1 -4458 8 -4494 5 -30 20 -75 31 -100 17 -36 341 -366 1413 -1439 765 -766 1403 -1400 1418 -1408 15 -8 37 -14 48 -14 38 0 87 30 104 63 16 30 17 538 14 7470 l-3 7438 -45 -30z" />
      <path fill={color} d="M10353 12803 l-1253 -3 0 -4423 c0 -4372 0 -4422 20 -4454 10 -18 37 -41 59 -53 40 -20 46 -20 1445 -18 l1405 3 28 21 c15 11 38 36 51 54 l22 33 0 4423 0 4424 -262 -2 c-145 -2 -827 -4 -1515 -5z" />
      <path fill="#2e383f" d="M9172 2850 c-18 -11 -41 -34 -52 -52 -20 -33 -20 -54 -20 -1381 l0 -1349 34 -34 c37 -37 85 -45 129 -23 31 16 2675 2658 2693 2691 18 35 18 72 -1 108 -33 65 75 60 -1405 60 -1324 0 -1345 0 -1378 -20z" />
    </g>
  </svg>
);
LogoSvg.propTypes = {
  color: PropTypes.string,
};
LogoSvg.defaultProps = {
  color: '#ffc300',
};

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
      (loggedIn, self) => {
        this.reaction = self;

        if (loggedIn) {
          events.fetchList();
        }
      },
      { fireImmediately: true },
    );
  }

  componentWillUnmount() {
    this.reaction.dispose();
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
            <LogoSvg />
          </Link>
          <span className="is-size-4 navbar-logo__title">
            UNIHACK
          </span>
        </React.Fragment>
      );
    }

    const { logoColor, name } = events.selected;
    return (
      <React.Fragment>
        <Link to="/">
          <LogoSvg color={logoColor} />
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
