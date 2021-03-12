import { UserService } from './../api/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  ref: any;
  dataObj: any;



  constructor(public userService: UserService) {}

  calculator() {
    this.userService.readData().subscribe(data => {

      let incomeObj = [];
      let expenditureObj = [];
      data.map(e => {
        let today = new Date().toISOString();
        if ((this.factoryDateTime(today)) != (this.factoryDateTime(e.payload.doc.data()['date']))) {
          console.log("ilove you");
        } else {
          if (e.payload.doc.data()['income']) {
            incomeObj.push(parseFloat(e.payload.doc.data()['count']));
          } else {
            expenditureObj.push(parseFloat(e.payload.doc.data()['count']))
          }
        }

      })

      let sumIncome = incomeObj.reduce((a, b) => a + b, 0);
      let sumExpenditure = expenditureObj.reduce((a, b) => a + b, 0);

      this.userService.income = sumIncome;
      this.userService.expenditure = sumExpenditure;

      // this.userService.incomeall = (((sumIncome) - (sumExpenditure / sumIncome) * sumIncome));
      // this.userService.expenditureall = ((sumExpenditure / (sumIncome)) * sumIncome);

      let number1 = (((sumIncome) - (sumExpenditure / sumIncome) * sumIncome));
      let number2 = ((sumExpenditure / (sumIncome)) * sumIncome);

      if(number1 <= 0) {
        this.userService.incomeall = 0;
        this.userService.expenditureall = number2;
      }
      else {
        this.userService.incomeall = number1;
        this.userService.expenditureall = number2;
      }

      console.log(number1, number2);

    })

  }

  factoryDateTime(dateTime: any) {

    let date = new Date(dateTime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) { day = 0 + day }
    if (month < 10) { month = 0 + month }

    let newdate = day + "-" + month + "-" + year;
    return newdate;

  }

}
