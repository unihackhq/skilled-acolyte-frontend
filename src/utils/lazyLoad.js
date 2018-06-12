import React from 'react';
import { Loader } from 'semantic-ui-react';

const withLazyLoad = load =>
  class LazyLoad extends React.Component {
    state = { LazyComponent: null };

    async componentWillMount() {
      const { default: LazyComponent } = await load();
      this.setState({ LazyComponent });
    }

    render() {
      const { LazyComponent } = this.state;

      if (LazyComponent) {
        return <LazyComponent {...this.props} />;
      }

      return <Loader active inline="centered" />;
    }
  };

export default withLazyLoad;
