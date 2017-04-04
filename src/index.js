import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { initStore } from './store';
import App from './app';

// only create store once (should be here otherwise the app might be called a few times during hot reloading
const store = initStore();

render(<AppContainer><App store={store} /></AppContainer>, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.js', () => {
    const App = require('./app.js').default;
    render(
      <AppContainer>
        <App store={store} />
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
