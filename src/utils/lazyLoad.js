import React from 'react';
import Loader from '../components/Loader';
import makeCancelable from './cancelablePromise';

const withLazyLoad = load =>
  class LazyLoad extends React.Component {
    state = { LazyComponent: null };

    async componentWillMount() {
      const { promise, cancel } = makeCancelable(load());
      this.cancel = cancel;

      try {
        const { default: LazyComponent } = await promise;
        this.setState({ LazyComponent });
      } catch (error) {
        if (!error.isCanceled) {
          throw error;
        }
      }
    }

    componentWillUnmount() {
      this.cancel();
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
