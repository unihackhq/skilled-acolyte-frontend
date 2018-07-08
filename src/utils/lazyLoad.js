import React from 'react';
import Loader from '../components/Loader';

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

      return <Loader />;
    }
  };

export default withLazyLoad;
