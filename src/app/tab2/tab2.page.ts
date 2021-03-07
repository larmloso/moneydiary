import { UserService } from './../api/user.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {


  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;



  doughnutChart: any;
  dataObj: any;
  newDatatime: any;
  optselected: any;

  dateTime: any = [
    { id: 1, name: 'วัน' , type: 'today'},
    // { id: 2, name: 'สัปดาห์', type: 'week'},
    // { id: 3, name: 'เดือน', type: 'month'},
    { id: 4, name: 'ทังหมด', type: 'all'},

  ];

  constructor(public userService: UserService) {
    this.optselected = this.dateTime[0].name;
  }


  companyFormSelected(event: any) {
    this.optselected = this.dateTime.type;
    this.calculator(event);
  }


  ngAfterViewInit() {
    console.log("ngAfterviewInit");
    this.doughnutChartMethod();
  }


  ionViewWillEnter() {
    console.log("hello", this.userService.incomeall);
    this.doughnutChartMethod();
  }



  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['รายรับ', 'รายจ่าย'],
        datasets: [{
          label: '# of Votes',
          data: [this.userService.incomeall, this.userService.expenditureall],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)',
          ],
          hoverBackgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
          ]
        }]
      }
    });
  }

  formatDate(dateObj: any){

    let date = new Date(dateObj);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if(day < 10){ day = 0 + day}
    if(month < 10){month = 0 + month}

    let newdate = day+"-"+month+"-"+year;
    return newdate;

  }


  calculator(event: any){


    this.userService.readData().subscribe(data => {

      let incomeObj = [];
      let expenditureObj = [];
      let today = new Date().toISOString();
      data.map(e => {

        if(event == 'all'){
          console.log("ทั้งหมด", event)
          if(e.payload.doc.data()['income']){
            incomeObj.push(parseFloat(e.payload.doc.data()['count']));
          }else {
            expenditureObj.push(parseFloat(e.payload.doc.data()['count']))
          }

        }
        else {
          if ((this.formatDate(today)) != (this.formatDate(e.payload.doc.data()['date']))) {
            console.log("false");
          } else {
            if (e.payload.doc.data()['income']) {
              incomeObj.push(parseFloat(e.payload.doc.data()['count']));
            } else {
              expenditureObj.push(parseFloat(e.payload.doc.data()['count']))
            }
          }
        }


      })

      let sumIncome = incomeObj.reduce((a, b) => a + b, 0);
      let sumExpenditure = expenditureObj.reduce((a, b) => a + b, 0);


      this.userService.income = sumIncome;
      this.userService.expenditure = sumExpenditure;

      this.userService.incomeall = (((sumIncome) - (sumExpenditure /sumIncome) * sumIncome));
      this.userService.expenditureall = ((sumExpenditure / (sumIncome)) * sumIncome);

      this.doughnutChartMethod();

      // console.log("รับ ",((num1) - (num2 /num1) * num1));
      // console.log("จ่าย ",(num2 / (num1)) * num1);
    })

  }







}
