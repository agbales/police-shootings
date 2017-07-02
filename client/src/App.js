import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {cases: []}
  }

  componentDidMount() {
    fetch('/cases')
      .then(res => res.json())
      .then(cases => this.setState({ cases }));
  }

  render() {
    let cases = this.state.cases

    return (
      <div className="App">
        <h1>All Records:</h1>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>date</th>
              <th>city</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>
            {cases.map(individual =>
              <Listing key={individual.id} listing={individual} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const Listing = (props) => <tr>
                              <td>{props.listing.name}</td>
                              <td>{props.listing.date}</td>
                              <td>{props.listing.city}</td>
                              <td>{props.listing.state}</td>
                            </tr>

export default App;
