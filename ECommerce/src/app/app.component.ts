import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/@bryntum/grid/grid.stockholm.css']
})
export class AppComponent {
  title = 'Product Management';

  //Bryntum Tables (Grid)
  // data = [
  //   { name: 'Dan Stevenson', city: 'Los Angeles' },
  //   { name: 'Talisha Babin', city: 'Paris' }
  // ];

  // gridConfig = gridConfig;

  // @ViewChild('grid') gridComponent?: BryntumGridComponent;  

  //Bryntum Scheduler

  // public resources = [
  //   { id: 1, name: "Dan Stevenson" },
  //   { id: 2, name: "Talisha Babin" }
  // ];

  // public events = [
  //   { resourceId: 1, startDate: '2022-01-01', endDate: '2022-01-10' },
  //   { resourceId: 2, startDate: '2022-01-02', endDate: '2023-01-09' },
  //   { resourceId: 3, startDate: '2022-01-03', endDate: '2024-01-09' }
  // ];

  // schedulerConfig = schedulerConfig;

  // @ViewChild("scheduler") schedulerComponent!: BryntumSchedulerComponent;

}