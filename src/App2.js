import React, { Component } from 'react';
import icon from './icon.png';
import './App.css';
import { askForPermissioToReceiveNotifications } from './push-notification';

class App2 extends Component {
    render() {
        return (
            <div className="App">
            <header className="App-header">
              <img src={icon} className="App-logo" alt="icon" />
              <h1 className="App-title">Welcome to the push-notification demo !</h1>
            </header>
            <button onClick={askForPermissioToReceiveNotifications} >
              Click here to receive notifications
            </button>
          </div>
        );
    }
}

export default App2;