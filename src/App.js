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
// Import utils
import constants from './Utils/Constants'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalSummary: null,
    }
  }

  componentDidMount() {
    // Fetch covid-19 data
    this.fetchData();
  }

  fetchData = () => {
    // clear previous data
    this.setState({ globalSummary: null })

    // fetch new data
    axios.get(constants.covid19ApiUrls.globalSummary)
      .then(res => {
        const data = res.data;
        this.setState({
          globalSummary: data
        });

      })
      .catch(err => {
        alert(`Error fetching tracker data from ${constants.covid19ApiUrls.globalSummary}: ${err}`)
      })
  }

  render() {

    const trackerData = this.state.globalSummary;
    const stats = [
      trackerData && trackerData.confirmed.value ? trackerData.confirmed.value : 0,
      trackerData && trackerData.recovered.value ? trackerData.recovered.value : 0,
      trackerData && trackerData.deaths.value ? trackerData.deaths.value : 0
    ];
    return (
      <div>
        <NavBarComponent />
        <br />
        <Container maxWidth="md">
          <Button variant="contained" color="primary" onClick={this.fetchData}>Refresh</Button>
          <br /><br />

          {/* Chart card */}
          <Card >
            <CardContent>
              {/* Load bar chart */}
              {trackerData ? <ChartComponent
                labels={['confirmed', 'recovered', 'deaths']}
                stats={stats}
                lastUpdate={trackerData.lastUpdate} /> : 'Loading...'}
            </CardContent>

            <CardActions>
              <small>Source "{constants.covid19ApiUrls.globalSummary}"</small>
            </CardActions>
          </Card>
        </Container>
      </div>
    )
  }

}

export default Dashboard;
