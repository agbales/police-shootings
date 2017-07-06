import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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
              <a className="navbar-brand" href="#">Police Shootings</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="twitter.com/agbales">@agbales</a></li>
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
                <h3>Police Shootings</h3>
                <p>Explore the Washington Post data on individuals who have been shot and killed by police. Search by city to view local cases.</p>
                <Button bsStyle="primary" href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwjw-rCZ6ezUAhVU42MKHVdDD0MQFggrMAA&url=https%3A%2F%2Fwww.washingtonpost.com%2Fgraphics%2Fnational%2Fpolice-shootings-2017%2F&usg=AFQjCNEMf2l63yKusAWlcWBge9hC1PpMbw&cad=rja">Learn more</Button>
                <br />
              </Jumbotron>
              <Jumbotron id="search-jumbo">
                <h3>Filter by City</h3>
                <div className="form-group">
                  <input type="text" className="form-control" onChange={this.filter.bind(this)} placeholder="ex: Seattle" />
                </div>
              </Jumbotron>
            </Col>
            <Col md={2} />
          </Row>
          <Row>
            <Col md={12}>
              <table id="cases-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Race</th>
                    <th>Date</th>
                    <th>Armed</th>
                    <th>Body Cam</th>
                    <th>City</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map(individual =>
                    <Listing key={individual.id} individual={individual} />
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const Listing = (props) => <tr>
                              <td>{props.individual.name}</td>
                              <td>{props.individual.age}</td>
                              <td>{props.individual.gender}</td>
                              <td>{props.individual.race}</td>
                              <td>{props.individual.date}</td>
                              <td>{props.individual.armed}</td>
                              <td>{props.individual.body_camera}</td>
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
