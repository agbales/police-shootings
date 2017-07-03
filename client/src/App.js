import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="https://github.com/washingtonpost/data-police-shootings" target="_blank">WP Stats</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" class="form-control" onChange={this.filter.bind(this)} placeholder="ex: Seattle" />
                </div>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Raw Data</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="jumbotron">
          <h1>2017 Police Shootings</h1>
          <p>This project uses data from the Washington Post to allow you to serach for individuals who have been shot and killed by police in your town.</p>
          <p><a class="btn btn-primary btn-lg" href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwjw-rCZ6ezUAhVU42MKHVdDD0MQFggrMAA&url=https%3A%2F%2Fwww.washingtonpost.com%2Fgraphics%2Fnational%2Fpolice-shootings-2017%2F&usg=AFQjCNEMf2l63yKusAWlcWBge9hC1PpMbw&cad=rja" role="button" target="_blank">Learn more</a></p>
        </div>
        <div className="row">
          <div className=".col-md-3" />
          <div className=".col-md-6">
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
          <div className=".col-md-3" />
        </div>
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
                                // construct object for BarChart
                                Object.keys(raceObj).map(function(key){
                                  var o = {};
                                  if(key !== "race"){
                                    o.race = key
                                    o.total = raceObj[key]
                                    data.push(o)
                                  }
                                  return o;
                                });
                                console.log(data);
                                return (<BarChart width={600} height={300} data={data}
                                                  margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                                         <XAxis dataKey="race"/>
                                         <YAxis/>
                                         <CartesianGrid strokeDasharray="1 1"/>
                                         <Tooltip/>
                                         <Bar dataKey="total" fill="#8884d8" />
                                      </BarChart>)
                              }


export default App;
