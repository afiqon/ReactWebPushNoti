import React, { Component } from 'react';
import icon from './icon.png';
import './App.css';
import firebase from 'firebase';
import { initializeFirebase } from './push-notification';
import registerServiceWorker from './registerServiceWorker';

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }
  
  componentWillMount() {
    initializeFirebase();
    this.askForPermissioToReceiveNotifications();
  }

  askForPermissioToReceiveNotifications = async () => {
    try {
  
      const messaging = firebase.messaging();
  
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('user token: ', token);
      messaging.onMessage(payload => {
        console.log("Notification Received", payload);
        //this is the function that gets triggered when you receive a 
        //push notification while you’re on the page. So you can 
        //create a corresponding UI for you to have the push 
        //notification handled.
        this.setState({
          message: payload.notification.body
        });
     });
    
    } catch (error) {
      console.error(error);
    }
  }

    render() {
      console.log(this.state.message);
        return (
            <div className="App">
            <header className="App-header">
              <img src={icon} className="App-logo" alt="icon" />
              <h1 className="App-title">Welcome to the push-notification demo !</h1>
              {/* <h1 className="App-title">{this.state.message}</h1> */}
            </header>
            <button>
            {this.state.message}
            </button>
          </div>
        );
    }
}

export default App2;