import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AppRouter from './AppRouter';
import { createStore } from 'redux';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import middleware from '../middleware';
import LoadingBar from 'react-redux-loading-bar';

const store = createStore(
  reducers,
  middleware
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoadingBar />
        <AppRouter>
          <div className="App">
          </div>
        </AppRouter>
      </Provider>
    );
  }
}

export default App;
