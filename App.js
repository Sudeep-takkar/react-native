import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import reducers from './components/reducers';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MapContainer from './components/MapContainer';

const store = createStore(reducers);
export default class App extends React.Component {

  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVUD9oCiIfEl697a0x9xD3a41odSi-Q4U',
      authDomain: 'authentication-e759d.firebaseapp.com',
      databaseURL: 'https://authentication-e759d.firebaseio.com',
      projectId: 'authentication-e759d',
      storageBucket: 'authentication-e759d.appspot.com',
      messagingSenderId: '878424266977'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <MapContainer />
        );
      case false:
        return <LoginForm />;
      default:
        <Spinner size="large" />;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          {this.state.loggedIn && <Header headerText='Demo' isLogIn/>}
          {!this.state.loggedIn && <Header headerText='Log In' />}
          {this.renderContent()}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
