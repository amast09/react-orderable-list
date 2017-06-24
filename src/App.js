import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import MovieItemList from './MovieItemList'

class App extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <MovieItemList/>
      </DragDropContextProvider>
    );
  }
}

export default App;
