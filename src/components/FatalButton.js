import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class FatalButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any, // eslint-disable-line react/require-default-props
    content: PropTypes.any, // eslint-disable-line react/require-default-props
  }

  state = { confirm: false }

  toggle = () => {
    this.setState({ confirm: true });
  }

  handleClick = (...args) => {
    this.setState({ confirm: false });
    this.props.onClick(...args);
  }

  render() {
    const { confirm } = this.state;

    if (confirm) {
      const { children, content, onClick, ...props } = this.props;

      return <Button {...props} negative onClick={this.handleClick}>Confirm</Button>;
    }

    const { onClick, ...props } = this.props;
    return <Button {...props} onClick={this.toggle} />;
  }
}

export default FatalButton;
