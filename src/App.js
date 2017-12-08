import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.testval = 'App';

    this.state = {
      timestamp: 'no timestamp yet',
      socket: openSocket('http://localhost:8000')
    };
  }

  test() {
    console.log('test', this.testval);
  }

  render() {
    return (
      <div className="App">
        <SearchBar socket={this.state.socket} func={this.test} parentthis={this}/>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.testval = 'search';

    this.props.func.bind(this.props.parentthis)();

    this.socket = props.socket;
    this.state = {
      value: '',
      body: false
    }
    this.socket.on('searchResult', (body) => {
      this.setState({ body });
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({value: e.target.value})
  }

  handleSearch() {
    this.socket.emit('search', this.state.value);
  }

  getItems() {
    if (this.state.body)
    {
      return (
        <ul>
          {this.state.body.elements.map((elem) => {
            return ( <li key={elem.id}>{elem.name}</li> );
          })}
        </ul>
      );
    }
    return ( <p>Search to get results!</p> );
  }

  render() {
    return (
      <div className="SearchBar">
        <input value={this.state.searchvalue} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSearch.bind(this)}>Search</button>
          {this.getItems()}
      </div>
    );
  }
}

export default App;
