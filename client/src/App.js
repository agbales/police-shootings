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
  filter(e){
    this.setState({filter: e.target.value})
  }
  render() {
    let cases = this.state.cases
    if(this.state.filter){
      cases = cases.filter( c =>
        c.city.toLowerCase()
        .includes(this.state.filter.toLowerCase())
      )
    }
    return (
      <div className="App">
        <input type="text" onChange={this.filter.bind(this)} />
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
              <Listing key={individual.id} individual={individual} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const Listing = (props) => <tr>
                              <td>{props.individual.name}</td>
                              <td>{props.individual.date}</td>
                              <td>{props.individual.city}</td>
                              <td>{props.individual.state}</td>
                            </tr>

export default App;
