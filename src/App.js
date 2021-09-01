import React, { Component } from 'react';
import Header from './Header';
import FullBody from './FullBody';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FullBody />
      </div>
    );
  }
}

export default App;
