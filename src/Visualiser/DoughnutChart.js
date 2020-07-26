import React from "react";
import {Doughnut} from 'react-chartjs-2';

class DoughnutChart extends React.Component {
  constructor() {
    super()
    this.state = {
      state: null
    }
  }

  componentDidMount() {
    this.setData()
  }

  setData = () => {
    let label = ['Work', "School", "Health", "Personal", "Others"]
    let barData = []
  
    for (let i=0; i < label.length; i++) {
      fetch(`http://localhost:3001/filter/${this.props.user["nickname"]}/activity_type/${label[i]}`)
                      .then(response => { return response.text() })
                      .then(data => JSON.parse(data))
                      .then(data => barData[i] = data["rows"][0]["sum"])
    }
    
    
    this.setState({
      state: {
        labels: label,
        datasets: [
          {
            label: 'Minutes',
            backgroundColor: ['red','blue','green','purple','grey'],
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: barData
          }
        ]
      }
    })
  }

  render() {
    return (
          <Doughnut
            data={this.state.state}
            options={{
              title:{
                display:true,
                text: 'By Grouping',
                fontSize: 15
              },
              legend:{
                display:true,
                position:'right'
              },
              responsive: true,
              maintainAspectRatio: false
            }}
          />
    )
  }
}

export default DoughnutChart;