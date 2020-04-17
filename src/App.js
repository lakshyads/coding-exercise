import React from 'react';
import axios from 'axios';
// Import Material-Ui components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Import custom components
import NavBarComponent from './components/NavBarComponent';
import ChartComponent from './components/ChartComponent';
// Import constants
import constants from './Utils/Constants'

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      globalData: null,
    }
  }

  componentDidMount() {
    // Fetch covid-19 data
    this.fetchData();
  }

  fetchData = () => {
    // clear previous data
    this.setState({globalData: null})

    // fetch new data
    axios.get(constants.apiUrl.trackerToday)
      .then(res => {
        const data = res.data;
        this.setState({
          globalData: data
        });
        
      })
      .catch(err => {
        alert(`Error fetching tracker data from ${constants.apiUrl.trackerToday}: ${err}`)
      })
  }

  render() {
        
    const trackerData = this.state.globalData;
    const stats = [
      trackerData && trackerData.confirmed.value ? trackerData.confirmed.value : 0,
      trackerData && trackerData.recovered.value ? trackerData.recovered.value : 0,
      trackerData && trackerData.deaths.value ? trackerData.deaths.value : 0
    ];
    return (
      <div>
        <NavBarComponent />
        <br />
        <Container>
          <Button variant="contained" color="primary" onClick={this.fetchData}>Reload</Button>
          <br /><br />

          {/* Chart card */}
          <Card >
            <CardContent>
              {/* Load bar chart */}
              {trackerData? <ChartComponent
                labels={['confirmed', 'recovered', 'deaths']}
                stats={stats} /> : 'Loading...'}
            </CardContent>

            <CardActions>
              <small>Source "{constants.apiUrl.trackerToday}"</small>
            </CardActions>
          </Card>
        </Container>
      </div>
    )
  }

}

export default Dashboard;
