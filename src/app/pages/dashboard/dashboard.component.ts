import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {DashboardService} from '../../service/dashboard.service';
import {ContractMetric, LicenseMetric} from '../../model/metric';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public licenseMetric: LicenseMetric;
  public contractMetric: ContractMetric;
  public licenseExpiredChartData: any;
  public licenseNonExpiredChartData: any;
  public contractChartData: any;

  constructor(private dashboardService: DashboardService,
              private message: NzMessageService) { }

  expired = false;

  ngOnInit() {

    this.getMetric();
  }

  public initChart() {
    const chartOrders = document.getElementById('chart-orders');
    parseOptions(Chart, chartOptions());
    const ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      // data: this.contractChartData
      data: this.contractChartData
    });

    // tslint:disable-next-line:prefer-const
    const chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      // tslint:disable-next-line:indent
      type: 'line',
      // tslint:disable-next-line:indent
      options: chartExample1.options,
      // tslint:disable-next-line:indent
      data: this.licenseNonExpiredChartData,
      // tslint:disable-next-line:indent
    });
  }


  keys(data: any): Array<string> {
    return Object.keys(data);
  }

  values(data: any): Array<number> {
    return Object.values(data);
  }

  public getMetric() {
    this.dashboardService.getMetric().subscribe(
      resp => {
        this.licenseMetric = resp.licenseMetric;
        this.contractMetric = resp.contractMetric;
        const nonExpiredKeys = this.keys(this.licenseMetric.nonExpiredItems);
        const nonExpiredValues = this.values(this.licenseMetric.nonExpiredItems);
        const expiredKeys = this.keys(this.licenseMetric.expiredItems);
        const expiredValues = this.values(this.licenseMetric.expiredItems);
        const contractKeys = this.keys(this.contractMetric.priceOfContract);
        const contractValues = this.values(this.contractMetric.priceOfContract);
        this.licenseExpiredChartData = this.getChartData(expiredKeys, expiredValues);
        this.licenseNonExpiredChartData = this.getChartData(nonExpiredKeys, nonExpiredValues)
        this.contractChartData = this.getChartData(contractKeys, contractValues);
        this.initChart();
      },
    () => {
        this.message.error('Refresh data failed');
      },
    );
  }

  public getChartData(keys: string[], values: number[]) {
    // tslint:disable-next-line:forin
    return {
        labels: keys,
        datasets: [{
          label: 'Count',
          data: values
        }]
    };
  }


  public updateOptions() {
    if (this.expired) {
      this.salesChart.data = this.licenseExpiredChartData;
    } else {
      this.salesChart.data = this.licenseNonExpiredChartData;
    }
    // this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
