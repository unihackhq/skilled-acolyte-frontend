import React from 'react';
import { Loader } from 'semantic-ui-react';

const withLazyLoad = load =>
  class LazyLoad extends React.Component {
    state = { Lazy: null }

    async componentWillMount() {
      const { default: Lazy } = await load();
      this.setState({ Lazy });
    }

    render() {
      const { Lazy } = this.state;

      if (Lazy) {
        return <Lazy {...this.props} />
      }

      return <Loader active inline="centered" />;
    }
  }

export default withLazyLoad;
