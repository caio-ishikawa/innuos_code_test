import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import albums from './albums.json';
import { Provider } from 'react-redux';

// REDUCER
const reducer = (state=albums, action) => {
  switch(action.type) {
    case 'ALL':
      state = albums;
      return state;
    
    case 'LOCAL':
      var localAlbums = [];
      for (var i = 0; i < albums.length; i++) {
        if (albums[i].source === "LOCAL") {
          localAlbums.push(albums[i]);
        }
      }
      state = localAlbums;
      return state;
    
    case 'QOBUZ':
      var qobuzAlbums = [];
      for (var j = 0; j < albums.length; j++) {
        if (albums[j].source === "QOBUZ") {
          qobuzAlbums.push(albums[j]);
        }
      }
      state = qobuzAlbums;
      return state;

    default:
      return state;
  }
};

// STORE
const store = createStore(reducer);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
