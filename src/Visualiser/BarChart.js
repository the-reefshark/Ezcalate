import React from "react";
import {Bar} from 'react-chartjs-2';

class BarChart extends React.Component {
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
    let label = []
    let barData = []
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const today = new Date()
  
    for (let i = 0; i < 7; i++) {
      let thisDay = new Date(today)
      thisDay.setDate(today.getDate() - i)
      label[6 - i] = days[thisDay.getDay()] + " " + thisDay.getDate() + " / " + (thisDay.getMonth() + 1)
      const month = (thisDay.getMonth() + 1) < 10 ? ("0" + (thisDay.getMonth() + 1)) : (thisDay.getMonth() + 1)
      const date = thisDay.getFullYear() + "-" + month + "-" + thisDay.getDate()
      fetch(`http://localhost:3001/filter/${this.props.user["nickname"]}/duedate/${date}`)
                      .then(response => { return response.text() })
                      .then(data => JSON.parse(data))
                      .then(data => barData[6 - i] = data[1]["rows"][0]["sum"] === null ? 0 :
                        Math.round((parseInt(data[1]["rows"][0]["sum"]) / 60) * 100) / 100)
    }
    this.setState({
      state: {
        labels: label,
        datasets: [
          {
            label: 'Minutes',
            backgroundColor: 'rgba(75,192,192,1)',
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
          <Bar
            data={this.state.state}
            options={{
              title:{
                display:true,
                text:'Weekly Report',
                fontSize:20
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

export default BarChart