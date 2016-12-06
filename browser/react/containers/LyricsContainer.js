import React, {Component} from 'react';
import store from '../store';

class LyricsContainer extends Component {

  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <h1>Just a container for now!</h1>
    );
  }

}

export default LyricsContainer;