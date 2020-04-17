import React from 'react';
import { Bar } from 'react-chartjs-2';

export default class ChartComponent extends React.Component {

    state = {
        // labels: this.props.labels ? this.props.labels : [],
        labels:['Total'],
        datasets: [
            {
                label: 'Confirmed',
                backgroundColor: 'rgb(45, 154, 154)',
                // borderColor: 'rgb(39, 99, 95)',
                borderWidth: 2,
                data: this.props.stats ? [this.props.stats[0]] : []
            },
            {
                label: 'Recovered',
                backgroundColor: 'rgb(68, 162, 72)',
                // borderColor: 'rgb(39, 99, 95)',
                borderWidth: 2,
                data: this.props.stats ? [this.props.stats[1]] : []
            },
            {
                label: 'Deaths',
                backgroundColor: 'rgb(229, 57, 53)',
                // borderColor: 'rgb(39, 99, 95)',
                borderWidth: 2,
                data: this.props.stats ? [this.props.stats[2]] : []
            }
        ]
    }

    render() {
        return (
            <div>
                <Bar
                    data={this.state}
                    options={{
                        title: {
                            display: true,
                            text: `Global Data updated at ${this.props.lastUpdate}`,
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        maintainAspectRatio: false
                    }}
                    height={500}
                />
            </div>
        );
    }
}