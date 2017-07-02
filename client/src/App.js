import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {cases: []}

  componentDidMount() {
    fetch('/cases')
      .then(res => res.json())
      .then(cases => this.setState({ cases }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cases.map(individual =>
              <tr key={individual.id}>
                <td>{individual.id}</td>
                <td>{individual.name}</td>
                <td>{individual.date}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
