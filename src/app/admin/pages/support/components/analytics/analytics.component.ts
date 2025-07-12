import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgChartsModule} from "ng2-charts";


@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgChartsModule
  ],
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  knowledgeVisits = 523;
  totalTickets = 87;
  resolvedTickets = 69;
  avgResponseTime = 4.3;

  get resolutionRate(): number {
    return Math.round((this.resolvedTickets / this.totalTickets) * 100);
  }

  chartLabels: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  chartData: ChartConfiguration<'line'>['data']['datasets'] = [
    {
      label: 'Tickets Creados',
      data: [5, 10, 8, 6, 9, 4, 2],
      tension: 0.3,
      fill: false
    },
    {
      label: 'Visitas a Base de Conocimiento',
      data: [20, 35, 30, 28, 25, 18, 15],
      tension: 0.3,
      fill: false
    }
  ];

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  ngOnInit(): void {}
}
