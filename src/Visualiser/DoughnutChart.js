import React from "react"
import {Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Monday', 'Tuesday', 'Wednesday',
           'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

function DoughnutChart() {

    return (

        <div >
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
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
      </div>

    )

}

export default DoughnutChart