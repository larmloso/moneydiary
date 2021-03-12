import { UserService } from './../api/user.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.page.html',
  styleUrls: ['./editpage.page.scss'],
})
export class EditpagePage implements OnInit {

  getData: any;

  title: any;
  count: any;
  income: any;
  radio: any;


  constructor(private navCtrl: NavController, private actroute: ActivatedRoute, private userService: UserService) {
    const DataObj = this.actroute.snapshot.paramMap.get('dataObj');
    this.getData = JSON.parse(DataObj);

    this.title = this.getData.title;
    this.count = this.getData.count;
    this.income = this.getData.income;
    this.radio = this.getData.income;

  }

  ngOnInit() {
  }

  radioHandler(event: boolean) {
    this.radio = event;
    //console.log(event)
  }



  Update() {

    let tmpcountry = {}
      tmpcountry['title'] = this.title;
      tmpcountry['count'] = this.count;
      tmpcountry['income'] = this.radio;
      tmpcountry['date'] = new Date().toISOString();
      this.userService.updateData(this.getData.id, tmpcountry);
    //console.log(tmpcountry);

    this.navCtrl.pop();
  }

  Back() {
    this.navCtrl.pop();
  }

}
