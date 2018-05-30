import React from 'react';
import { Button } from 'semantic-ui-react';

class FatalButton extends React.Component {
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

      return <Button {...props} negative onClick={this.handleClick}>Confirm</Button>
    }

    const { onClick, ...props } = this.props;
    return <Button {...props } onClick={this.toggle} />
  }
}

export default FatalButton;
