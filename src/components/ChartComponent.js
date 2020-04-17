import React from 'react';
import { Bar } from 'react-chartjs-2';

export default class ChartComponent extends React.Component {
    
    state = {
        labels: this.props.labels ? this.props.labels : [],
        datasets: [
            {
                label: 'Today',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: this.props.stats ? this.props.stats : [] 
            }
        ]
    }

    render(){
        return (
            <div>
                <Bar
                    data={this.state}
                    options={{
                        title: {
                            display: true,
                            text: 'Updated tracker values',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
}