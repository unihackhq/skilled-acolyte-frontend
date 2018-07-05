import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

class Loader extends React.Component {
  static propTypes = {
    noDelay: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    noDelay: false,
    inline: false,
  }

  state = { show: false }

  componentDidMount() {
    this.timer = setTimeout(
      () => this.setState({ show: true }),
      1000,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { noDelay, inline } = this.props;
    const { show } = this.state;

    if (show || noDelay) {
      return (
        <div
          className={classNames(
            'loader__container',
            {
              loader__container__inline: inline,
              loader__container__absolute: !inline,
            },
          )}
        />
      );
    }

    return null;
  }
}

export default Loader;
