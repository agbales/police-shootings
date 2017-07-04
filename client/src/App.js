import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import ReactDOM from 'react-dom';
import { Nav, Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
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
        <Nav>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="https://github.com/washingtonpost/data-police-shootings">WP Stats</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Raw Data</a></li>
              </ul>
            </div>
          </div>
        </Nav>
        <Grid>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <Jumbotron id="about-jumbo">
                <RaceStats cases={this.state.cases} />
                <h3>2017 Police Shootings</h3>
                <p>This project uses data from the Washington Post to allow you to serach for individuals who have been shot and killed by police in your town.</p>
                <Button bsStyle="primary" href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwjw-rCZ6ezUAhVU42MKHVdDD0MQFggrMAA&url=https%3A%2F%2Fwww.washingtonpost.com%2Fgraphics%2Fnational%2Fpolice-shootings-2017%2F&usg=AFQjCNEMf2l63yKusAWlcWBge9hC1PpMbw&cad=rja">Learn more</Button>
                <br />
              </Jumbotron>
              <Jumbotron id="search-jumbo">
                <h3>Filter by City</h3>
                <div className="form-group">
                  <input type="text" class="form-control" onChange={this.filter.bind(this)} placeholder="ex: Seattle" />
                </div>
              </Jumbotron>
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
            </Col>
            <Col md={2} />
          </Row>
        </Grid>
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
