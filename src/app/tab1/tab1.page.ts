import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../api/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tmpobj: any;
  dataObj: any;
  income: any;
  expenditure: any;

  constructor(private alertCtrl: AlertController, private userService: UserService,
    private router: Router
    ) {

  }


  ngOnInit(): void {
    this.userService.readData().subscribe(data => {
      this.tmpobj = data.map(e => {
        return {
          id: e.payload.doc.id,
          count: e.payload.doc.data()['count'.toString()],
          title: e.payload.doc.data()['title'.toString()],
          income: e.payload.doc.data()['income'.toString()],
          date: this.dateTime(e.payload.doc.data()['date'.toString()]),
        }
      });
    })
  }

  sendToEdit(item: any){
    this.router.navigate(['editpage', JSON.stringify(item)]);
  }


  async presentIncome(isIncom: boolean) {
    let titlemag = 'รายรับ';
    if (!isIncom) { titlemag = "รายจ่าย" }


    let alert = this.alertCtrl.create({
      message: titlemag,
      inputs: [
        {
          name: 'title',
          placeholder: 'title'

        },
        {
          name: 'count',
          placeholder: 'จำนวนเงิน',
          type: 'number',

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ADD',
          handler: data => {
            if (data.title != '' && data.count != '') {
              let tmpobj =  //db : inputform
              {
                title: data.title,
                count: data.count,
                income: isIncom,
                date: new Date().toISOString(),
              };
              this.userService.createData(tmpobj);
            }
          }//handler

        }//update
      ]
    });
    (await alert).present();
  }

  async presentConfirm(tmpitem: any) {
    let alert = this.alertCtrl.create({
      //title: 'Confirm purchase',
      message: 'Do you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Deleted');

            //this.deleteCountryItem(tmpitem);
            this.userService.delData(tmpitem.id); //del rowfrom DB
          }
        }
      ]
    });
    (await alert).present();
  }

  async presentPrompt(tmpitem: any) {
    let tmpcountry = {};

    let alert = this.alertCtrl.create({
      message: "แก้ไขข้อมูล",
      inputs: [
        {
          name: 'title',
          placeholder: 'title',
          value: tmpitem.title,

        },
        {
          name: 'count',
          placeholder: 'จำนวนเงิน',
          type: 'number',
          value: tmpitem.count,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked', tmpitem.income);
          }
        },
        {
          text: 'Update',
          handler: data => {
            if (data.title == '' || data.count == '')
              //show toast
              return false;
            else { //update here
              tmpcountry['title'] = data.title;
              tmpcountry['count'] = data.count;
              tmpcountry['income'] = tmpitem.income;
              tmpcountry['date'] = new Date().toISOString();
              this.userService.updateData(tmpitem.id, tmpcountry);


            }//else
          }//handler
        }//update
      ]
    });
    (await alert).present();
  }


  dateTime(dateTime: any) {

    let date = new Date(dateTime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (day < 10) { day = 0 + day }
    if (month < 10) { month = 0 + month }

    let newdate = day + "-" + month + "-" + year + "  " + hours + ":" + minutes;
    return newdate;

  }

}
