import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import GifList from './components/GifList';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        gifs: []
    }
  }

  handleTermChange = term => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;
    
    axios.get(url)
      .then(response => this.setState({ gifs: response.data.data }))
  }

  render() {
    return (
      <div className="App">
       <SearchBar onTermChange={term => this.handleTermChange(term)}/>
       <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

export default App;
