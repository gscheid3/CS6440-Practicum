import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-stool-chart',
  templateUrl: './stool-chart.component.html',
  styleUrls: ['./stool-chart.component.css']
})
export class StoolChartComponent implements OnInit {  

  stoolChart: any;
  
  createChart() {
    this.stoolChart = new Chart('stoolChart', {
        type: 'doughnut',
        data: {
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        }
      });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
