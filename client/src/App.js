import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
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
    console.log(cases)
    if(this.state.filter){
      cases = cases.filter( c =>
        c.city.toLowerCase()
        .includes(this.state.filter.toLowerCase())
      )
    }
    return (
      <div className="App">
        <input type="text" onChange={this.filter.bind(this)} placeholder="Check your city"/>
        <RaceStats cases={this.state.cases} />
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>race</th>
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
                              <td>{props.individual.race}</td>
                              <td>{props.individual.date}</td>
                              <td>{props.individual.city}</td>
                              <td>{props.individual.state}</td>
                            </tr>

const RaceStats = (props) => {
                                let initialValue = {}
                                var reducer = (tally, c) => {
                                  let race = c.race;

                                  if(race.length === 0) {
                                    race = "NA"
                                  }

                                  if(!tally[race]) {
                                    tally[race] = 1;
                                  } else {
                                    tally[race] = tally[race] + 1;
                                  }

                                  return tally;
                                };

                                var raceObj = props.cases.reduce(reducer, initialValue)
                                var data = []
                                Object.keys(raceObj).map(function(key){
                                  var o = {};
                                      o.race = key
                                      o[key] = raceObj[key]
                                  data.push(o)
                                });
                                console.log(data);
                                return (<BarChart width={1000} height={500} data={data}
                                                  margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                                         <XAxis dataKey="race"/>
                                         <YAxis/>
                                         <CartesianGrid strokeDasharray="1 1"/>
                                         <Tooltip/>
                                         <Legend />
                                         <Bar dataKey="A" fill="#8884d8" />
                                         <Bar dataKey="B" fill="#82ca9d" />
                                         <Bar dataKey="H" fill="#82ca9d" />
                                         <Bar dataKey="N" fill="#82ca9d" />
                                         <Bar dataKey="O" fill="#82ca9d" />
                                         <Bar dataKey="W" fill="#82ca9d" />
                                         <Bar dataKey="NA" fill="#82ca9d" />
                                      </BarChart>)
                              }

export default App;
